import { useContext } from "react";
import UserContext from "./UserContext.jsx";
function GrandChild() {
    const name = useContext(UserContext);
    return <h2>GrandChild {name}</h2>
}
export default GrandChild;