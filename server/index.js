const express = require("express");
const cors = require("cors")


const {connection}= require("./config/db")


const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173","https://recipeapp-ruby-two.vercel.app/"], // Allow local & deployed frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
    credentials: true, // Allow cookies & authentication headers
}));

// ✅ Handle Preflight CORS Requests
app.options("*", cors());  




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

