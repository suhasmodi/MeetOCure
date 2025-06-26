const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/slots", require("./routes/slotRoutes"));
app.use("/api/hospitals", require("./routes/hospitalRoutes"));
app.use("/api/availability", require("./routes/availabilityRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));






app.get("/", (req, res) => 
{
    res.send("API is Working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));