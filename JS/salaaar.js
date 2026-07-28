const vegetables = ["brinjal", "carrot", "cabbage", "cauliflower", "spinach"];
//vegetables.forEach(veg => {console.log(veg);});
function something(m,callback){
    console.log(m+"nothing");
    callback();
}
function callback(){
    console.log("casting:j,t");
}
//something("movie:",callback);
//problem
let promise = new Promise((resolve,reject)=>{
    resolve("success");});
    //promise.then(result => {console.log(result);});
async function sum(){
    return 7+8;
}
//sum().then(console.log);
let std={
    NAME:"Deepika",
    AGE:22,
}
 let json=JSON.stringify(std);
 console.log(json);