const express = require("express");
const cors = require("cors")


const {connection}= require("./config/db")


const app = express()

app.use(cors({
    origin: ["http://localhost:5173","https://recipeappfrontend-uacm.onrender.com/"], // Allow local & deployed frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
    credentials: true, // Allow cookies & authentication headers
}));
app.use(express.json())

// ✅ Handle Preflight CORS Requests



app.get("/", (req,res)=>{
    res.send("Hello World")
})


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/recipes", require("./routes/recipeRoutes"));

const PORT = 8000;

app.listen(PORT, async()=>{
    try {
        await connection
        console.log("Connected to DB");   
    } catch (error) {
      console.log(error,"Error in connecting DB");
      
    }
    console.log(`Server running on http://localhost:${PORT}`);

})

