//! import mongoose

const mongoose = require("mongoose")

//! connection string

mongoose.connect("mongodb://127.0.0.1:27017/circleUp", { useNewUrlParser: true })

//! model

const User = mongoose.model("User",
    {
        username: String,
        password: String,
        email: String,
        name: String,
        gender: String,
        demographicInfo: String,
        age: Number,
        displayPic: String,
        followers: [],
    }
)

const Post = mongoose.model("Post",
    {
        username: String,
        posts: [{
            title: String,
            image: String,
            text: String,
            date: String,
            iddate: String
        }]
    }
)



const Message = mongoose.model("Message",
    {
        username: String,
        send : [
            {
                reciever : String,
                message : String,
                time : String,
                iddate : String
            }
        ],
        recieve : [
            {
                sender : String,
                message : String,
                time : String,
                iddate : String
            }
        ]
    }
)



//!  Export

module.exports = {
    User, Post, Message
}