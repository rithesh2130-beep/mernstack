import { useState, useEffect } from "react";
import bulbOn from "./assets/images.jpeg";
import bulbOff from "./assets/e0fd25f9127a9a109a0648c83ee61643.jpg";

function Events() {
    const [isBulbOn, setIsBulbOn] = useState(false);

    // Sync background and text color to the document body when isBulbOn changes
    useEffect(() => {
        document.body.style.backgroundColor = isBulbOn ? "white" : "black";
        document.body.style.color = isBulbOn ? "black" : "white";
        // Clean up when leaving component
        return () => {
            document.body.style.backgroundColor = "";
            document.body.style.color = "";
        };
    }, [isBulbOn]);

    return (
        <div style={{ textAlign: "center", padding: "50px", minHeight: "100vh" }}>
            <h2>Magic Bulb Room</h2>
            <br />
            <button onClick={() => setIsBulbOn(true)}>Turn on the light</button>
            <img src={isBulbOn ? bulbOn : bulbOff} style={{ width: "150px", margin: "0 30px", verticalAlign: "middle" }} alt="Light Bulb" />
            <button onClick={() => setIsBulbOn(false)}>Turn off the light</button>
        </div>
    );
}

export default Events;
