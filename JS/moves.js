const box=document.querySelector(".center-box");
const buttons=document.querySelectorAll(".direction-btn");
const cameraStatus=document.getElementById("camera-status");

box.style.position="fixed";
box.style.zIndex="1000";
box.style.transformOrigin="center center";


let x=box.getBoundingClientRect().left;
let y=box.getBoundingClientRect().top;
let scale=1;
let targetScale=1;

function updateBox(){
    box.style.left=`${x}px`;
    box.style.top=`${y}px`;
    box.style.transform=`scale(${scale})`;
}

function clamp(value,min,max){
    return Math.min(Math.max(value,min),max);
}

function smoothScale(){
    scale=scale+(targetScale-scale)*0.18;
}

updateBox();

function moveBox(direction){
    if(direction==="right") x+=10;
    if(direction==="left") x-=10;
    if(direction==="up") y-=10;
    if(direction==="down") y+=10;
    updateBox();
}

buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        if(button.classList.contains("right")) moveBox("right");
        if(button.classList.contains("left")) moveBox("left");
        if(button.classList.contains("up")) moveBox("up");
        if(button.classList.contains("down")) moveBox("down");
    });
});
document.addEventListener("keydown",(event)=>{
    if(event.key==="ArrowRight"){
        event.preventDefault();
        moveBox("right");
    }
    if(event.key==="ArrowLeft"){
        event.preventDefault();
        moveBox("left");
    }
    if(event.key==="ArrowUp"){
        event.preventDefault();
        moveBox("up");
    }
    if(event.key==="ArrowDown"){
        event.preventDefault();
        moveBox("down");
    }
});

const video=document.createElement("video");
video.autoplay=true;
video.playsInline=true;
video.muted=true;
video.style.display="none";
document.body.appendChild(video);

const hands=new Hands({
    locateFile:(file)=>`https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
    maxNumHands:1,
    modelComplexity:1,
    minDetectionConfidence:0.7,
    minTrackingConfidence:0.7
});

hands.onResults((results)=>{
    if(results.multiHandLandmarks && results.multiHandLandmarks.length>0){
        const landmarks=results.multiHandLandmarks[0];
        const indexFingerTip=landmarks[8];
        const thumbTip=landmarks[4];

        const pinchDistance=Math.hypot(indexFingerTip.x-thumbTip.x,indexFingerTip.y-thumbTip.y);
        targetScale=clamp(0.6+(pinchDistance*6),0.6,2.5);

        x=(indexFingerTip.x*window.innerWidth)-(box.offsetWidth/2);
        y=(indexFingerTip.y*window.innerHeight)-(box.offsetHeight/2);
        smoothScale();
        updateBox();
        cameraStatus.textContent="Hand detected: moving and zooming with pinch distance";
    }else{
        cameraStatus.textContent="Show your hand to the camera";
    }
});

const camera=new Camera(video,{
    onFrame:async()=>{
        await hands.send({image:video});
    },
    width:640,
    height:480
});

camera.start()
    .then(()=>{
        cameraStatus.textContent="Camera started. Show your hand to move the box.";
    })
    .catch((error)=>{
        cameraStatus.textContent=`Camera error: ${error.message}`;
    });
