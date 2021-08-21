const mongoose = require('mongoose')
const validator = require('validator')
// Connecting to the Mongoose Client
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

// Creating the schema of the user table
const User = mongoose.model('User',{
    name: {
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!")
            }
        }
    },
    age: {
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("Age must be a positive Number")
            }
        }
    }
})

// Performing the insert and save operation
const me = new User({
    name:"    Andrew  ",
    email:"MYEMAIL@MEAD.IO  "
})

me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log("Error!",error)
})

// Creating the schema of Task table
const Task = mongoose.model('Task',{
    description:{
        type: String
    },
    completed:{
        type:Boolean
    }
})

// Performing the insert and save on Task Table
// const task = new Task({
//     description:'Learn the Mongoose Library',
//     completed:false
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log("Error!",error)
// })