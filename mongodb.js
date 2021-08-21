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
    // db.collection('users').findOne({_id:new ObjectID("61211b0026c9313204c156dc")},(error,user)=>{
    //     if(error){
    //         return console.log("Unable to fetch the data")
    //     }
    //     console.log(user)
    // })
    // db.collection('users').find({name:"Yami"}).toArray((error,users)=>{
    //     console.log(users)
    // })
    // db.collection('users').find({name:"Yami"}).count((error,count)=>{
    //     console.log(count)
    // })
    db.collection("tasks").findOne({_id:new ObjectID("612116159c209d31c0966cc3")},(error,doc)=>{
        console.log(doc)
    })
    db.collection("tasks").find({completed:false}).toArray((error,docs)=>{
        console.log(docs)
    })
})
