const User = require("../models/User");
const bcrypt = require('bcryptjs')
const Register = async (req, res) => {
    // 200 == successfull
    if(await User.findOne({email: req.body.email})){
        res.status(200).json({message:"User Exists"})
    }
    else{
        const newUser = new User({email:req.body.email,password:req.body.password})
        await newUser.save()
        res.status(200).json({message:"New user"})

    }    
};

const Login = async(req,res) =>{
    const user = await User.findOne({email:req.body.email})
    if(user){
        if(await bcrypt.compare(req.body.password,user.password)){
        res.status(200).json({message:"Login Successfully"})
    }
    else{
        res.status(200).json({message:"Invalid Credentails"})
    }
}
    else{
        res.status(200).json({message:"User Doesnt Exists"})
    }
}

module.exports = {Register,Login};
