const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURl, { useNewUrlParser : true }, (error,client)=>{
    if(error){
        return console.log("Unable to connect to database")
    }

    const db = client.db(databaseName)
    
    // db.collection('users').insertOne({
    //     name:"Arya",
    //     age: 19
    // }, (error,result)=>{
    //     if(error){
    //         return console.log("Unable to insert user")
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:"Aspartan",
    //         age:22
    //     },
    //     {
    //         name:"Troy",
    //         age:26
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log("Unable to insert")
    //     }
    //     console.log(result.ops)
    // })
    db.collection('tasks').insertMany([
        {
            description:"Buy Grocery",
            completed: false
        },
        {
            description:"Sell Laptop",
            completed: true
        },
        {
            description:"Wake Up",
            completed:false
        }
    ],(error,result)=>{
        if(error){
            return console.log("Unable to insert new data")
        }
        console.log(result.ops)
    })
})