const show=()=>{
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const number=document.getElementById("number").value;
    let gender='';
    const genders=document.getElementsByName("gender");
    for(let i=0;i<genders.length;i++)
        {  
        if(genders[i].checked)
            {
            gender=genders[i].value;
            break;
            }
        }
    let qualification=[];
    const qualifications=document.getElementsByClassName("qualification");
    for(let i=0;i<qualifications.length;i++)
        {
        if(qualifications[i].checked)
            {
            qualification.push(qualifications[i].value);
            }
        }
        const dob=document.getElementById("dob").value;
        let image=document.getElementById("image").files[0];
        let imageName=image ? image.name : 'no image selected';
        document.getElementById("source").innerHTML=
        `
        <h1>Forms</h1>
        Name: ${name}<br>
        Email: ${email}<br>
        Password: ${password}<br>
        Number: ${number}<br>
        Gender: ${gender}<br>
        Qualification: ${qualification.join(", ")}<br>
        Date of Birth: ${dob}<br>
        Image: ${imageName}<br>
        <img src="${image ? URL.createObjectURL(image) : ''}" alt="No Image" style="width:150px;height:150px;margin-top:8px;${image ? '' : 'display:none;'}"><br>`;

}
