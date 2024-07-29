const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Register user
router.post('/register',async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hashSync(password,salt)
        const newUser = new User({username,email,password:hashedPassword})
        const savedUser=await newUser.save()
        res.status(200).json(savedUser)

    }
    catch(err){
       res.status(500).json(err)
    }
})

//login user
router.post('/login',async(req,res)=>{
    try{
       const user=await User.findOne({email:req.body.email})
       !user && res.status(404).json("no user found!")

       const match=await bcrypt.compare(req.body.password,user.password)

       if(!match){
        return res.status(401).json("Wrong Credentials!")
       }

       const token = jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"1d"})
       const {password,...info}=user._doc
       res.cookie("token",token).status(200).json(user) 

    //    return res.status(200).json(user)    




    //    else{
    //     const accessToken=jwt.sign({id:user._id},process.env.token,{expiresIn:"15d"})
    //     // res.cookie('accessToken',accessToken).json('ok')
        
    //     const {password,...others}=user._doc
    //     res.status(200).json({...others,accessToken})
    //   //  console.log({...others,accessToken})
    //    }
       

    }
    catch(err){
       res.status(500).json(err) 
    }
})


//LOG OUT USER
router.get("/logout",async(req,res)=>{

    try{
        res.clearCookie('token',{sameSite:"none",secure:true}).status(200).send("user logged out successfully!")
    }

    catch(err){
        res.status(500).json(err)
    }

    // res.clearCookie('accessToken',{path:"/"})
    // res.status(200).json("user logged out!")
})

//Refetch User
router.get("/refetch",(req,res)=>{
    const token = req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async(err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})




module.exports=router