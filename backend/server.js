const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const compression = require("compression");
const auth = require("./routes/authRoutes")
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json())
app.use(compression());
app.use("/api/auth",auth)
mongoose.connect(process.env.DB_DEV).then(()=>console.log("DB started")).catch(err=>{console.log("Connection error",err)});

app.listen(process.env.PORT||5000 , ()=>{
    console.log(`Server Running at : ${process.env.PORT}`);
})