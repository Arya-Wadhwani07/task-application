const express = require('express')
const User = require("../models/user")
const auth = require('../middleware/auth')
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


// POST route for logging out the user
router.post('/users/logout', auth, async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send()
    } catch(e){
        res.status(500).send()
    }
})

// POST route for logging out all instances
router.post('/users/logoutAll',auth, async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e){
        res.status(500).send()
    }
})

// GET route for getting all the existing users
router.get("/users/me",auth,async (req,res)=>{
    res.send(req.user)    
})


// PATCH route for updating a user
router.patch('/users/me', auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const updatesAllowed = ['name','email','password','age']
    const isValidOperation  = updates.every((update)=>updatesAllowed.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:"Invalid Updates"})
    }
    try{
        updates.forEach((update)=>req.user[update]=req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(e){
        res.status(400).send(e)
    }
})

//DELETE route for deleting a user
router.delete('/users/me', auth, async(req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    } catch(e){
        res.status(500).send(e)
    }
})

module.exports = router