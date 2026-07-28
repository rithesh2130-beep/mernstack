import { useState } from "react";
import "./DB_connect.css";

function DB_connect() {
    const [formsData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState(
        {
            type: '',
            mgs: ''
        }
    );
    const [loading, setLoading] = useState(false);
    const handleInputData = (e) => {
        const { name, value } = e.target;
        setFormData(
            prev => ({
                ...prev,
                [name]: value
            })
        );


    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({
            type: '',
            mgs: ''
        });
        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formsData)
            });
            const data = await response.json();
            if (response.ok) {
                setStatus({
                    type: "success",
                    mgs: "form submitted successfully"
                });
                setFormData({
                    name: "",
                    email: "",
                    message: ""
                });
            } else {
                setStatus({
                    type: "failure",
                    mgs: data.message
                });
            }
        } catch (error) {
            console.error("Network or server error:", error);
            setStatus({
                type: "error",
                mgs: "coudnt connect to localhost"
            });
        } finally {
            setLoading(false);
        }

    };


    return (
        <div className="db-connect-container">
            <h1>Send Message</h1>
            {status.mgs && (
                <div className={`db-connect-message ${status.type}`}>
                    {status.mgs}
                </div>
            )}
            <form className="db-connect-form" onSubmit={handleSubmit}>
                <div className="db-connect-form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formsData.name} required onChange={handleInputData} />
                </div>
                <div className="db-connect-form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formsData.email} required onChange={handleInputData} />
                </div>
                <div className="db-connect-form-group">
                    <label>Message:</label>
                    <textarea name="message" rows="4" value={formsData.message} required onChange={handleInputData} />
                </div>
                <button className="db-connect-button" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    )
}
export default DB_connect;