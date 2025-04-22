const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const createUserModel = require('../models/user');
 const sequelize = require('../db');
 const User = createUserModel(sequelize);
 const JWT_SECRET="fndsnfsdfndfdsdf";  
 router.post('/signup',async(req,res)=>{
    const{name,email,password} =req.body;
    try{
        const user = await User.create({name,email,password})
        res.status(201).json({message:'User Register Successfully ', user})
    }catch(err){
        res.status(400).json({error:err.message});
        }
    }
 )
 router.post('/login',async(req,res)=>{
    const{email,password} = req.body;
    try{
        const user = await User.findOne({where:{email}});
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(401).json({message:'Invalid credentail'})
        }
        const token =jwt.sign({userId:user.id,name: user.name }, JWT_SECRET,{ expiresIn:'1h'});
        res.json({token});
    }catch(err){
        res.status(500).json({error:err.message})
    }
 })
 module.exports =router;