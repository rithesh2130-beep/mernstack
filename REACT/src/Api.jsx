import axios from "axios";
import { useState, useEffect } from "react";
function Api() {
    const API = "https://jsonplaceholder.typicode.com/users"
    const [user, setUser] = useState([]);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [userId, setUserId] = useState(""); // Track the ID for top input fields
    useEffect(() => {
        getusers();
    }, [])
    async function getusers() {
        try {
            const response = await axios.get(API);
            setUser(response.data);

        }
        catch (error) {
            console.log(error);
        }
    }
    async function adduser() {
        if (name == "" || email == "") {
            alert("Please enter name and email");
            return;
        }
        try {
            const response = await axios.post(API, { name, email });
            setUser([...user, response.data]);
            setname("");
            setemail("");
            alert("User added successfully");
        }
        catch (error) {
            console.log(error);
        }
    }
    async function updateuser(id) {
        if (!id) {
            alert("Please provide an ID to update!");
            return;
        }
        try {
            // Use the input states (name, email) instead of hardcoded text!
            const response = await axios.put(`${API}/${id}`, { name: name, email: email });
            setUser(user.map((u) => u.id == id ? response.data : u));
            alert("User updated successfully");
        }
        catch (error) {
            console.log(error);
        }
    }
    async function deleteuser(id) {
        if (!id) {
            alert("Please provide an ID to delete!");
            return;
        }
        try {
            await axios.delete(`${API}/${id}`);
            setUser(user.filter((u) => u.id != id));
            alert("User deleted successfully");
        }
        catch (error) {
            console.log(error);
        }
    }


    return (

        <>
            <div>
                <h1>react curd operations</h1>
                <label>ID (for Update/Delete):</label>
                <input type="number" placeholder="Enter ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
                <br />
                <label>Name:</label>
                <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setname(e.target.value)} />
                <br />
                <label>Email:</label>
                <input type="text" placeholder="Enter Email" value={email} onChange={(e) => setemail(e.target.value)} />
                <br />
                <button onClick={adduser}>Add User</button>
                {/* Pass the explicitly typed userId from the input box! */}
                <button onClick={() => updateuser(userId)}>Update User</button>
                <button onClick={() => deleteuser(userId)}>Delete User</button>
                <br />
                <table style={{borderCollapse:"collapse",width:"100%"}}>
                    <thead style={{backgroundColor:"#f1f1f1",color:"black",border:"1px solid black"}}>
                        <tr style={{border:"1px solid black"}}>
                            <th style={{border:"1px solid black",alignContent:"center"}}>Name</th>
                            <th style={{border:"1px solid black",alignContent:"center"}}>Email</th>
                            <th style={{border:"1px solid black",alignContent:"center"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{border:"1px solid black"}}>
                        {user.map((user) => (
                            <tr key={user.id} style={{border:"1px solid black"}}>
                                <td style={{border:"1px solid black",alignContent:"center"}}>{user.name}</td>
                                <td style={{border:"1px solid black",alignContent:"center"}}>{user.email}</td>
                                <td style={{border:"1px solid black",alignContent:"center"}}>
                                    <button style={{border:"1px solid black",alignContent:"center"}} onClick={() => updateuser(user.id)}>Update</button>
                                    <button style={{border:"1px solid black",alignContent:"center"}} onClick={() => deleteuser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );

}
export default Api;