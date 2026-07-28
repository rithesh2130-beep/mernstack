import biriyani from "./assets/hero.png";
function Biriyani(props) {
    return(
        <div>
          <h1 style={{color:"blue",fontSize:"20px"}}>Biriyani</h1>
          <h2>eating biriyani is a great fun</h2>
          <p>Biriyani is a delicious dish. Name: {props.name}</p>
          <img style={{height:"100px",width:"100px",flexDirection:"column"}} src={biriyani} alt="" />
        </div>
    )
}
export default Biriyani;
