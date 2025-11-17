const Task = require("../models/task")
const jwt = require("jsonwebtoken")

const createTask = async (req,res) =>{
    if(!await Task.findOne({title:req.body.title})){
            const create = new Task({
                title:req.body.title,
                user:req.user.id,
            })
            await create.save()
            res.status(200).json({ message: "Task Created" });
    }
    else{
        res.status(200).json({ message: "Task already exists" })
    }
    
}

const getTask = async (req,res) =>{
    try{
        const result = await Task.find({user:req.user.id})
        res.status(200).json(result)
    }
    catch(error){
        res.status(500).json({message:"Server Error"})
    }
}

const deleteTask = async (req,res) =>{
    try{
        const del = await Task.findOneAndDelete({user:req.user.id , _id:req.params.id})
        res.status(200).json(del)
    }
    catch(error){
        res.status(500).json({message:"Task not Found"})
    }
}

const updateTask = async (req,res) =>{
    try{
        const update= await Task.findOneAndUpdate({_id: req.params.id, user: req.user.id},{title:req.body.title},{new:true})
        res.status(200).json(update)
    }
    catch(error){
        res.status(500).json({message:"Server Error"})
    }
}
