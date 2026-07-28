import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
const MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/contact";

mongoose.connect(MONGO_URI).then(() => {
    console.log("connected to mongodb");
}).catch((error) => {
    console.log(error);
});

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true },
}, { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const contact = new Contact({ name, email, message });
        await contact.save();
        res.status(201).json({ success: true, data: { contact }, message: "Contact added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, data: null, message: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});