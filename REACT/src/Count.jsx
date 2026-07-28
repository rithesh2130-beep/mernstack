import { useState, useEffect } from "react";
import "./Count.css";
import UserContext from "./UserContext.jsx";
import Parent from "./Parent.jsx";

function Count() {
    // Initialized count to 0 so math operations like +1 and -1 work properly
    const [count, setCount] = useState(0);
    const [mobile, buymobile] = useState("motorola");
    const [lunch, finishlunch] = useState("");

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count])

    return (
        <div className="container">
            {/* Count Section */}
            <div className="card">
                <h1 className="title">Count: <span>{count}</span></h1>
                <div className="btn-group">
                    <button onDoubleClick={() => setCount(count + 1)}>+1</button>
                    <button onDoubleClick={() => setCount(count - 1)}>-1</button>
                    <button className="reset-btn" onClick={() => setCount(0)}>Reset</button>
                </div>
            </div>

            {/* Mobile Section */}
            <div className="card">
                <h2 className="title">Mobile: <span>{mobile}</span></h2>
                <div className="btn-group">
                    <button onClick={() => buymobile("iphone")}>Buy iPhone</button>
                </div>

                <h2 className="title">OS: <span>{mobile === "iphone" ? "iOS" : "Android"}</span></h2>
                <div className="btn-group">
                    <button onClick={() => buymobile(mobile === "motorola" ? "iphone" : "motorola")}>Change Mobile</button>
                </div>
            </div>

            {/* Lunch Section */}
            <div className="card">
                <h2 className="title" style={{ color: "blue" }}>I had my lunch: <span>{lunch}</span></h2>
                <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. dal rice"
                    onChange={(e) => finishlunch(e.target.value)}
                />
            </div>
            <div>
                <UserContext.Provider value="rithesh">
                    <Parent />
                </UserContext.Provider>
            </div>
        </div>
    )
}

export default Count;