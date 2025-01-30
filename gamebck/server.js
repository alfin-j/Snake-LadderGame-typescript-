const express =require('express');
const { default: mongoose } = require('mongoose');
const app=express();
const cors = require("cors")


app.use(express.json());
app.use(cors());
const bcrypt = require("bcrypt");

const port =5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

app.get("/",(req,res)=>{
    res.send("hello alfin");
})

mongoose.connect("mongodb+srv://alfin:alfin@cluster0.a7oli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",)
.then(() => console.log("connected to database"))
.catch((err) => console.log(err));

//Schema database
const registerSchema =mongoose.Schema({
    username:String,
    email:String,
    password:String
})
const scoreSchema = mongoose.Schema({
    username:String,
    scorePlayer1:Number,
    scorePlayer2:Number,
})

//creating model or collection
const registerModel = mongoose.model("register",registerSchema);
const scoreModel = mongoose.model("Scores",scoreSchema)

app.post("/registergame",async(req,res)=>{
    try{
    const {username,email,password}=req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const document =new registerModel({username,email,password:hashedPassword})
    const saved =await document.save();
    savedDocument = saved;
    res.status(200).json(savedDocument)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }

})
app.post('/logingame', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        // Find the user by email
        const user = await registerModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Compare entered password with the stored hashed password
        //check for await is needed
        const isMatchPass = await bcrypt.compare(password, user.password);

        if (!isMatchPass) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", id:user._id ,username:user.username });
    } catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/score",async(req,res)=>{
    try{
        const {username,scorepl1,scorepl2}=req.body;
        const document =new scoreModel({username,scorePlayer1:scorepl1,scorePlayer2:scorepl2})
        const saved =await document.save();
        savedDocument = saved;
        res.status(200).json(savedDocument)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }

    })
