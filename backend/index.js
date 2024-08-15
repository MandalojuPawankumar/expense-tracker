const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const mongoose = require('mongoose');
const UserModel = require('./Models/User');
require('dotenv').config();
require('./Models/db');
app.use(express.json())
const PORT = process.env.PORT || 8080;


//schema
const schemaData = mongoose.Schema({
    itemid:Number,
    itemname:String,
    amount:String,
    date:String,
    category:String,
},{
    timestamps : true
})
//usermodel
const userModel = mongoose.model("userdata",schemaData)
//read
app.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({success : true, data :data})
})
//create data // save data in mongodb
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success : true, message : "data saved successfully", data : data})
})


//update data
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const { _id,...rest} = req.body

    console.log(rest)
    const data = await userModel.updateOne({ _id : _id},rest)
    res.send({success : true,message : "data updated successfully", data : data})
})
// delete api
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true,message : "data deleted successfully", data : data})
})


app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})