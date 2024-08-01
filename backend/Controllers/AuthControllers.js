const  bcrypt = require('bcrypt');
const UserModel =require('../Models/User');
const jwt=require('jsonwebtoken');

const signup= async (req,res)=>{
try{
    const {name,email,password}=req.body;
    const user= await UserModel.findOne({email});
    if(user){
    return res.status(409)
        .json({message:"user already exists ,you can log in",success:false})
    }
    const userModel=new UserModel({name,email,password});
    userModel.password= await bcrypt.hash(password,10);
    await userModel.save();
    res.status(201).json({message:"sign-up successful",success:true});


}catch(err){
    res.status(500).json({message:"internal server error",success:false});
}
}


const login= async (req,res)=>{
    try{
        const {email,password}=req.body;
        const errmsg="auth failed email or password is wrong";
        const user= await UserModel.findOne({email});
        if(!user){
        return res.status(403)
            .json({message:errmsg,success:false})
        }
        const ispasseql=  await bcrypt.compare(password,user.password);
        if(!ispasseql){
            res.status(403)
            .json({message:errmsg,success:false})
        }

        const jwtToken= jwt.sign({email:user.email,_id:user._id},
            'Secret-123',
            {expiresIn:'24h'}
        )
        res.status(200).json({message:"login successful",success:true,jwtToken,email,name:user.name});
       
        
    
    }catch(err){
        res.status(500).json({message:"internal server error",success:false});
    }
    }

module.exports={
    signup,
    login
}