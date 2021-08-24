const express = require('express')
const User = require("../models/user")
const router = new express.Router()

// POST route for creating new users and saving in the database
router.post('/users',async(req,res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        const token = user.getAuthenticationToken()
        res.status(201).send({user,token})
    } catch(e){
        res.status(400).send(e)
    }

})

//POST route to login users
router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.getAuthenticationToken()
        res.send({user,token})
    } catch(e){
        res.status(400).send()
    }
})

// GET route for getting all the existing users
router.get("/users",async (req,res)=>{

    try{
        const users = await User.find({})
        res.status(500).send(users)
    } catch(e){
        res.status(500).send()
    }
    
})

// GET dynamic route for getting one user
router.get('/users/:id',async (req,res)=>{
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(400).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send()
    }
})

// PATCH route for updating a user
router.patch('/users/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const updatesAllowed = ['name','email','password','age']
    const isValidOperation  = updates.every((update)=>updatesAllowed.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:"Invalid Updates"})
    }
    try{
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{ new:true, runValidators: true})
        const user = await User.findById(req.params.id)
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save()

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

//DELETE route for deleting a user
router.delete('/users/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send(e)
    }
})

module.exports = router