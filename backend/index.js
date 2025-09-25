const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT


app.use(cors({
    origin: process.env.FRONT_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: "2mb" }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB 연결 성공"))
    .catch((err) => console.error("MongoDB 연결 실패:", err.message));

app.get('/', (req, res) => {
    res.send('Photo memo API CHECK OK!')
})

const authRoutes = require("./routes/authRoutes")
app.use("/api/auth", authRoutes)

app.use((req, res) => {
    return res.status(500).json({ message: "서버오류" })
})

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})