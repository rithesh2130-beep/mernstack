import { useState } from "react";
import "./forms.css";

function Forms() {
    const [User, Setuser] = useState({
        name: "",
        age: "",
        email: "",
        password: "",
        gender: "",
        phone: "",
        skils: ""
    });

    const [submittedData, setSubmittedData] = useState(null);

    const change = (e) => {
        Setuser({ ...User, [e.target.name]: e.target.value })
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        setSubmittedData(User);
        alert("Form submitted");
    };

    return (
        <>
            <div className="form-container">
                <h1>forms</h1>
                <form className="form-stack" onSubmit={handlesubmit}>
                    <label className="form-label" htmlFor="name">Name:</label>
                    <input className="form-input" type="text" name="name" value={User.name} onChange={change} />

                    <label className="form-label" htmlFor="age">Age:</label>
                    <input className="form-input" type="number" name="age" value={User.age} onChange={change} />

                    <label className="form-label" htmlFor="email">Email:</label>
                    <input className="form-input" type="email" name="email" value={User.email} onChange={change} />

                    <label className="form-label" htmlFor="password">Password:</label>
                    <input className="form-input" type="password" name="password" value={User.password} onChange={change} />

                    <label className="form-label" htmlFor="gender">Gender:</label>
                    <div className="radio-group">
                        <input type="radio" name="gender" value="male" onChange={change} /> <span className="radio-text">Male</span>
                        <input type="radio" name="gender" value="female" onChange={change} /> <span className="radio-text">Female</span>
                    </div>

                    <label className="form-label" htmlFor="phone">Phone:</label>
                    <input className="form-input" type="number" name="phone" value={User.phone} onChange={change} />

                    <label className="form-label" htmlFor="skils">Skils:</label>
                    <select className="form-input" name="skils" value={User.skils} onChange={change}>
                        <option value="">Select</option>
                        <option value="react">React</option>
                        <option value="angular">Angular</option>
                        <option value="vue">Vue</option>
                    </select>

                    <button className="submit-btn" type="submit">Submit</button>
                </form>
            </div>

            {submittedData && (
                <div className="form-container" style={{ marginTop: "20px" }}>
                    <h2>Submitted Details</h2>
                    <p><strong>Name:</strong> {submittedData.name}</p>
                    <p><strong>Age:</strong> {submittedData.age}</p>
                    <p><strong>Email:</strong> {submittedData.email}</p>
                    <p><strong>Password:</strong> {submittedData.password}</p>
                    <p><strong>Gender:</strong> {submittedData.gender}</p>
                    <p><strong>Phone:</strong> {submittedData.phone}</p>
                    <p><strong>Skills:</strong> {submittedData.skils}</p>
                </div>
            )}
        </>
    )
}

export default Forms;