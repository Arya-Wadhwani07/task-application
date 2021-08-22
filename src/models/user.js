const mongoose = require('mongoose')
const validator = require('validator')

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
    password:{
        type:String,
        required:true,
        minLength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Passowrd should not be password!")
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

module.exports=User