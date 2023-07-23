//! Import express

const express = require("express")


//! Import Logic file

const logic=require("./service/logic")

//! App Creation (Server Creation)

const app = express()

//! ntegrate front end with server

const cors=require("cors")
app.use(cors({origin:"http://localhost:4200"}))


//! Increase payload size limit to 10MB

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));


//! to convert every incoming json response to javascript

app.use(express.json())


//! Port set

app.listen(3000, ()=>{
    console.log("Server started succesfully at port 3000");
})


//! register

app.post("/register",(req,res)=>{
    logic.register(req.body.username,req.body.password,req.body.name).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//! login
app.post("/login",(req,res) => {
    logic.login(req.body.username,req.body.password).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//! more details entry

app.post("/moreDetails",(req,res) => {
    logic.moreDetails(req.body.username,req.body.email,req.body.gender,req.body.demographicInfo,req.body.age,req.body.displayPic).then(result => {
        res.status(result.statusCode).json(result)
    })
})


// //! sending message
// app.post("/messages",(req,res) => {
//     logic.sendMessage(req.body.username,req.body.message,req.body.date).then(result => {
//         res.status(result.statusCode).json(result)
//     })
// })


// //! access message

// app.get("/messages/:username",(req,res)=>{
//     logic.getMessages(req.params.username).then(result => {
//         res.status(result.statusCode).json(result)
//     })
// })


//! Post logic

app.post("/newpost",(req,res)=>{
    logic.posting(req.body.username,req.body.title,req.body.image,req.body.text,req.body.date,req.body.iddate).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//! post get logic

app.post("/feed",(req,res)=>{
    logic.viewPosts(req.body.usernames).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//! Profile View

app.get("/profile/:username",(req,res)=>{
    logic.profile(req.params.username).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//! profile Posts show

app.get("/userposts/:username",(req,res)=>{
    logic.viewPost(req.params.username).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//! find people

// app.get("/discover/:username",(req,res)=>{
//     logic.findPeople(req.params.username).then(result => {
//         res.status(result.statusCode).json(result)
//     })
// })


app.post("/discover",(req,res)=>{
    logic.findPeople(req.body.usernames).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//! Add New Follower

app.post("/timeline",(req,res)=>{
    logic.newFollower(req.body.username,req.body.usernames).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//! find followers

app.get("/getfollowers/:username",(req,res)=>{
    logic.currentFollowers(req.params.username).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//! Update Profile


app.post("/editprofile",(req,res) => {
    logic.update(req.body.username,req.body.name,req.body.email,req.body.image,req.body.location).then(result => {
        res.status(result.statusCode).json(result)  
    })
})


//! Delete Post

app.delete("/deletepost/:iddate",(req,res) => {
    logic.deletePost(req.params.iddate).then(result => {
        res.status(result.statusCode).json(result)  
    })
})



//! Delete Profile Logic

app.delete("/deleteprofile/:username",(req,res) => {
    logic.profileDelete(req.params.username).then(result => {
        res.status(result.statusCode).json(result)  
    })
})


//! Get Message recievers

app.post("/recievers",(req,res)=>{
    logic.followersProfile(req.body.usernames).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//! Send message 

app.post("/sendmessage",(req,res) => {
    logic.sendMessage(req.body.sender,req.body.reciever,req.body.message,req.body.time,req.body.iddate).then(result =>{
        res.status(result.statusCode).json(result)
    })
})


//! Recieve message

app.post("/recievemessage",(req,res) => {
    logic.recieveMessage(req.body.sender,req.body.reciever,req.body.message,req.body.time,req.body.iddate).then(result =>{
        res.status(result.statusCode).json(result)
    })
})


//! Access Reciever Message

app.post("/getrecievermessage",(req,res) => {
    logic.getRecieverMessages(req.body.sender,req.body.reciever).then(result => {
        res.status(result.statusCode).json(result)
    })
})


//! Access Sender Msssages

app.post("/getsendermessage",(req,res) => {
    logic.getsenderMessages(req.body.sender,req.body.reciever).then(result => {
        res.status(result.statusCode).json(result)
    })
})