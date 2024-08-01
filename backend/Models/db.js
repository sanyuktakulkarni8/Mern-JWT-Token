const mongoose = require("mongoose");



const mongo_url="mongodb+srv://Sanyu-Kulkarni:Sanyu@authdb.rz8vpn2.mongodb.net/AuthDb?retryWrites=true&w=majority&appName=AuthDb";

mongoose.connect(mongo_url)
.then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log("error connecting to db",err);

})