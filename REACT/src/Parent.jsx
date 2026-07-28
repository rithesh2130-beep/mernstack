import { useContext } from "react";
import Child from "./Child.jsx";
import UserContext from "./UserContext.jsx";
function Parent() {
    const name = useContext(UserContext);
    return <Child name={name}/>
}
export default Parent;