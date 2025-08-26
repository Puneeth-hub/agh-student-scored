import express from "express"; 
import cors from "cors";  
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import studentRoutes from "./routes/studentRoutes.js";
import readinessRoutes from "./routes/readinessRoutes.js";




dotenv.config(); 
const app = express(); 
app.use(cors({ origin: "*" }));
app.use(express.json());

await connectDB(); 

app.use("/api/students", studentRoutes)
app.use("/api/readiness", readinessRoutes)
app.use("/api/readiness", readinessRoutes);

app.get('/', (req,res) => {
    res.send("welcome to agh student scored ")
}) 


const PORT  = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log("The server is connected successfully")
})