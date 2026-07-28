import { useContext } from "react";
import GrandChild from "./GrandChild.jsx";
import UserContext from "./UserContext.jsx";
function Child() {
    const name = useContext(UserContext);
    return <GrandChild name={name} />
}
export default Child;