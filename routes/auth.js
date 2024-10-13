const express=require('express');
const router=express.Router();
const Student=require('../models/student');
const Admin=require('../models/admin');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.post('/register',async(req,res)=>
{
    const {name,email,password,role}=req.body;
    
    try
    {
        if(role=='student')
        {
        let student=await Student.findOne({email});
        if(student) return res.status(400).json({error:"Student already exists"});
        student=new Student({name,email,password});
        await student.save();
        const token=jwt.sign({ _id:student._id,role:'student'},'secretKey');
        res.status(201).json({token});
        }
        else{
            let admin=await Admin.findOne({email});
            if(admin)return res.status(400).json("Admin already exists!");
            admin=new Admin({name,email,password});
            await admin.save();
            const token=jwt.sign({_id:admin._id,role:'admin'},'secretKey');
            res.status(201).json({token});
        }



    }
    catch(err)
    {
        res.status(500).json({error: "Internal Server error!"});

    }
});

router.post("/login",async (req,res)=>
{
    const {email,password,role}=req.body;
    try
    {
        if(role=='student'){
        const student=await Student.findOne({email});
        if(!student)return res.status(400).json({error:"Student not yet registered!"});
        const comparer=await bcrypt.compare(password,student.password);
        if(!comparer)
            return res.status(400).json({error:"Password doesn't match!"});
        const token=jwt.sign({_id:student._id,role:'student'},'secretKey');
        res.status(200).json({token});
        }
        else{
        const admin=await Admin.findOne({email});
        if(!admin)return res.status(400).json({error:"Admin not yet registered!"});
        const comparer=await bcrypt.compare(password,admin.password);
        if(!comparer)
            return res.status(400).json({error:"Password doesn't match!"});
        const token=jwt.sign({_id:admin._id,role:'admin'},'secretKey');
        res.status(200).json({token});
        }
    }
    catch(err)
    {
        res.status(500).json({"error":"Internal Server error!"});
    }
});
module.exports=router;