const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique : true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.pre('Save',async function(){
    const user = this;
    if(!user.isModified('password')){
        return;
    }
    const salt = await bcrypt.genSalt(10);
    user.password =  await bcrypt.hash (user.password,salt);
    
})

module.exports = mongoose.model('User', UserSchema)