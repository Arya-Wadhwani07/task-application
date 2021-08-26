const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
//     if(req.method==='GET'){
//         res.send("GET methods are disabled")
//     } else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send("Site is under maintainence")
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log("Server is up at port ",port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async ()=>{
    // const task = await Task.findById('6127ca0e2c641b05d49c6e79')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('6127c8cb38628e33c4c5d435')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}
main()