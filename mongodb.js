// Basic CRUD Operations

const {MongoClient,ObjectID} = require('mongodb')

const connectionURl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString.length)


MongoClient.connect(connectionURl, { useNewUrlParser : true }, (error,client)=>{
    if(error){
        return console.log("Unable to connect to database")
    }

    const db = client.db(databaseName)
    // db.collection('users').updateOne({
    //     _id: new ObjectID("6121450ede3cf34018dd7752")
    // },{
    //     // $set:{
    //     //     name:"Mike"
    //     // }
    //     $inc:{
    //         age:1
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    db.collection('tasks').updateMany({
        completed:false
    },{
        $set:{
            completed:true
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})
