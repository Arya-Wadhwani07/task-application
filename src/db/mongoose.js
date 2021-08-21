const mongoose = require('mongoose')

// Connecting to the Mongoose Client
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

// Creating the schema of the user table
const User = mongoose.model('User',{
    name: {
        type:String
    },
    age: {
        type:Number
    }
})

// Performing the insert and save operation
// const me = new User({
//     name:"Andrew",
//     age:27
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log("Error!",error)
// })

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
const task = new Task({
    description:'Learn the Mongoose Library',
    completed:false
})

task.save().then(()=>{
    console.log(task)
}).catch((error)=>{
    console.log("Error!",error)
})