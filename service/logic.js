//! import db.js file

const db = require("./db")


//! create a function for register logic

register = (username, password, name) => {

    //? collection key:arg value

    return db.User.findOne({ username: username }).then(user => {
        if (user) {
            return {
                message: "Seems like you already in the circle !",
                status: false,
                statusCode: 404
            }
        }
        else {

            //? creating an object for new user

            newuser = new db.User({
                username: username,
                password: password,
                name: name
            })

            // ? Save new object to reflect the change in db

            newuser.save()
            return {
                message: "Welcome to the Circle",
                user: username,
                name: name,
                status: true,
                statusCode: 200
            }
        }
    })
}


//! Login Logic


login = (username, password) => {

    return db.User.findOne({ username, password }).then(user => {
        if (user) {
            return {
                message: "Logged in successfully",
                status: true,
                statusCode: 200,
                currentUser: user.username,
                name: user.name
                // currentAcno:user.acno,
                // token           //ie token:token
            }
        }
        else {
            return {
                message: "Incorrect acno or password",
                status: false,
                statusCode: 401
            }
        }
    }
    )
}



//! More details logic

moreDetails = (username, email, gender, demographicInfo, age, displayPic) => {

    return db.User.findOne({ username }).then(user => {

        if (user) {
            user.gender = gender,
                user.demographicInfo = demographicInfo,
                user.age = age,
                user.displayPic = displayPic,
                user.email = email
            user.save()

            return {
                statusMessage: user,
                status: true,
                statusCode: 200
            }
        }

        else {
            return {
                message: "Invalid User",
                status: false,
                statusCode: 401
            }
        }

    })
}



// //! message send logic

// sendMessage = (username, message, time) => {

//     return db.Message.findOne({ username: username }).then(user => {

//         if (user) {
//             user.username = username
//             user.messages.push(
//                 {
//                     message: message,
//                     time: time
//                 }
//             )

//             user.save()

//             return {
//                 statusMessage: "Message Send",
//                 status: true,
//                 statusCode: 200,
//                 sender: user.username,
//                 msg: user.messages
//             }

//         }
//         else {
//             newMessage = new db.Message({
//                 username: username,
//                 messages: {
//                     message: message,
//                     time: time
//                 }
//             })

//             newMessage.save()

//             return db.Message.findOne({ username: username }).then(newmsg => {

//                 return {
//                     statusMessage: "Message Send",
//                     status: true,
//                     statusCode: 200,
//                     sender: username,
//                     msg: newmsg.messages
//                 }

//             })
//         }
//     }
//     )
// }




// //! get message

// getMessages = (username) => {
//     return db.Message.findOne({ username }).then(user => {
//         if (user) {
//             return {
//                 message: user.messages,
//                 status: true,
//                 statusCode: 200,
//             }
//         }

//         else {
//             return {
//                 message: "Invalid user",
//                 status: false,
//                 statusCode: 404
//             }
//         }
//     })
// }



//! Post

posting = (username, title, image, text, date, iddate) => {
    return db.Post.findOne({ username }).then(user => {
        if (user) {
            user.username = username
            user.posts.push({
                title: title,
                image: image,
                text: text,
                date: date,
                iddate: iddate
            })

            user.save()

            return {
                message: "Posted",
                status: true,
                statusCode: 200,
                post: user
            }
        }
        else {
            newPost = new db.Post({
                username: username,
                posts: {
                    title: title,
                    image: image,
                    text: text,
                    date: date,
                    iddate: iddate
                }
            })

            newPost.save()
            return {
                message: "Posted",
                status: true,
                statusCode: 200,
                post: newPost
            }

        }
    })
}



//! view post of followed users

// viewPosts = (usernames) => {
//     return db.Post.find({ username: { $in: usernames } }).then(posts => {
//         if (posts.length >= 1) {
//             formattedPosts = posts.reduce((result, post) => {
//                 userPosts = post.posts.map(userPost => ({
//                     username: post.username,
//                     title: userPost.title,
//                     image: userPost.image,
//                     text: userPost.text,
//                     date: userPost.date
//                 }));
//                 return result.concat(userPosts);
//             }, []);


//             return {
//                 usersposts: formattedPosts,
//                 status: true,
//                 statusCode: 200
//             }
//         }
//         else {
//             return {
//                 usersposts: "No followers posts to show",
//                 statusCode: 404
//             }
//         }
//     })
// }


// viewPosts = (usernames) => {
//     return db.User.find({ username: { $in: usernames } })
//       .then(users => {
//         if (users.length >= 1) {
//           const usernamesFound = users.map(user => user.username);
//           const profiles = users.map(user => ({
//             username: user.username,
//             name: user.name,
//             email: user.email,
//             age: user.age,
//             demographicInfo: user.demographicInfo,
//             gender: user.gender
//           }));
//           return db.Post.find({ username: { $in: usernamesFound } })
//             .then(posts => {
//               if (posts.length >= 1) {
//                 const formattedPosts = posts.reduce((result, post) => {
//                   const userPosts = post.posts.map(userPost => ({
//                     username: post.username,
//                     title: userPost.title,
//                     image: userPost.image,
//                     text: userPost.text,
//                     date: userPost.date
//                   }));
//                   return result.concat(userPosts);
//                 }, []);

//                 return {
//                   usersposts: formattedPosts,
//                   profiles: profiles,
//                   status: true,
//                   statusCode: 200
//                 };
//               } else {
//                 return {
//                   usersposts: "No followers posts to show",
//                   profiles: profiles,
//                   statusCode: 404
//                 };
//               }
//             });
//         } else {
//           return {
//             usersposts: "No followers found",
//             profiles: [],
//             statusCode: 404
//           };
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching posts:", error);
//         return {
//           usersposts: "An error occurred",
//           profiles: [],
//           statusCode: 500
//         };
//       });
//   };



viewPosts = (usernames) => {
    return db.User.find({ username: { $in: usernames } })
        .then(users => {
            if (users.length >= 1) {
                const usernamesFound = users.map(user => user.username);
                const profiles = users.map(user => ({
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    age: user.age,
                    demographicInfo: user.demographicInfo,
                    gender: user.gender
                }));
                return db.Post.aggregate([
                    { $match: { username: { $in: usernamesFound } } },
                    {
                        $lookup: {
                            from: "users",
                            localField: "username",
                            foreignField: "username",
                            as: "user"
                        }
                    },
                    { $unwind: "$user" },
                    { $unwind: "$posts" },
                    {
                        $project: {
                            username: "$username",
                            name: "$user.name",
                            email: "$user.email",
                            age: "$user.age",
                            pic: "$user.displayPic",
                            demographicInfo: "$user.demographicInfo",
                            gender: "$user.gender",
                            dp: "$user.displayPic",
                            title: "$posts.title",
                            image: "$posts.image",
                            text: "$posts.text",
                            date: "$posts.date"
                        }
                    }
                ]).then(posts => {
                    if (posts.length >= 1) {
                        return {
                            usersposts: posts,
                            profiles: profiles,
                            status: true,
                            statusCode: 200
                        };
                    } else {
                        return {
                            usersposts: "No followers posts to show",
                            profiles: profiles,
                            statusCode: 404
                        };
                    }
                });
            } else {
                return {
                    usersposts: "No followers found",
                    profiles: [],
                    statusCode: 404
                };
            }
        })
        .catch(error => {
            console.error("Error fetching posts:", error);
            return {
                usersposts: "An error occurred",
                profiles: [],
                statusCode: 500
            };
        });
};




//! view post of user


viewPost = (username) => {
    return db.Post.findOne({ username }).then(posts => {
        if (posts) {
            return {
                userposts: posts.posts,
                status: true,
                statusCode: 200
            }
        }
        else {
            return {
                userposts: "No posts to show",
                statusCode: 404
            }
        }
    })
}



//! User Profile


profile = (username) => {

    return db.User.findOne({ username }).then(user => {
        if (user) {
            return {
                details: user,
                status: true,
                statusCode: 200
            }
        }
        else {
            return {
                message: "Invalid User",
                status: false,
                statusCode: 401
            }
        }

    })
}



//! Find People without current followers


findPeople = (excludeUsernames) => {
    return db.User.find({ username: { $nin: excludeUsernames } }).then(users => {
        if (users) {
            return {
                message: users,
                status: true,
                statusCode: 200
            }
        }
        else {
            return {
                message: "error",
                status: false,
                statusCode: 401
            }
        }
    })
}




//! Add new follower


newFollower = (username, usernames) => {

    return db.User.findOne({ username: username }).then(user => {
        if (user) {
            user.followers.push(
                usernames
            )

            user.save()

            return {
                message: user,
                followers: user.followers,
                status: true,
                statusCode: 200
            }

        }

        else {
            return {
                message: "No User Found",
                status: false,
                statusCode: 404
            }
        }
    })
}



//! Get followers list for feed view


currentFollowers = (username) => {
    return db.User.findOne({ username: username }).then(user => {
        if (user) {
            return {
                followers: user.followers,
                status: true,
                statusCode: 200
            }
        }
        else {
            return {
                message: "No such user Found",
                status: false,
                statusCode: 404
            }
        }
    })
}


//! Profile Update

update = (username, name, email, image, location) => {

    return db.User.findOne({ username: username }).then(user => {
        if (user) {
            user.name = name,
                user.email = email,
                user.displayPic = image,
                user.demographicInfo = location

            user.save()

            return {
                newDetails: user,
                status: true,
                statusCode: 200
            }
        }
        else {
            return {
                message: "No such user Found",
                status: false,
                statusCode: 404
            }
        }
    })
}


//! Delete Post


// deletePost = (iddate) => {

//     return db.Post.findOneAndDelete({ "posts.iddate": iddate }).then(post => {
//         if (post) {
//             return{
//                 message : "Post deleted",
//                 status : true,
//                 statusCode : 200
//             }
//         }
//         else{
//             return{
//                 message : "no post found",
//                 status : false,
//                 statusCode : 404
//             }
//         }
//     })

// }


deletePost = (iddate) => {
    return db.Post.updateOne(
        { "posts.iddate": iddate },
        { $pull: { posts: { iddate: iddate } } }
    )
        .then((result) => {
            if (result.nModified > 0) {
                return {
                    message: "Post deleted",
                    status: true,
                    statusCode: 200,
                };
            } else {
                return {
                    message: "No post found",
                    status: false,
                    statusCode: 404,
                };
            }
        });
};


profileDelete = (username) => {
    return db.User.findOneAndDelete({ username }).then((user) => {
        if (user) {
            return {
                message: "User deleted",
                status: true,
                statusCode: 200,
            };
        } else {
            return {
                message: "No user found",
                status: false,
                statusCode: 404,
            };
        }
    })
}



//! Message Recievers


followersProfile = (usernames) => {
    return db.User.find({ username: { $in: usernames } }).then(users => {
        if (users.length >= 1) {
            return {
                details: users,
                status: true,
                statusCode: 200
            };
        } else {
            return {
                message: "Invalid User",
                status: false,
                statusCode: 404
            };
        }
    });
};



//! Send Message 


sendMessage = (sender, reciever, message, time, iddate) => {
    return db.Message.findOne({ username: sender }).then(senduser => {
        if (senduser) {
            senduser.send.push({
                reciever: reciever,
                message: message,
                time: time,
                iddate: iddate
            })

            senduser.save()

            // return db.Message.findOne({ username: reciever }).then(recieveuser => {

            //     if (recieveuser) {
            //         recieveuser.recieve.push({
            //             sender: sender,
            //             message: message,
            //             time: time,
            //             iddate: iddate
            //         })

            //         recieveuser.save()

            //     }
            // })

            return {
                message: senduser,
                status: true,
                statusCode: 200
            }
        }

        else {
            newMessage = new db.Message({
                username: sender,
                send: {
                    reciever: reciever,
                    message: message,
                    time: time,
                    iddate: iddate
                }
            })

            newMessage.save()

            return {
                message: newMessage,
                status: true,
                statusCode: 200
            }
        }
    })
}



//! Reciever side


recieveMessage = (sender, reciever, message, time, iddate) => {
    return db.Message.findOne({ username: reciever }).then(user => {
        if (user) {
            user.recieve.push({
                sender: sender,
                message: message,
                time: time,
                iddate: iddate
            })

            user.save()

            return {
                message: user,
                status: true,
                statusCode: 200
            }
        }

        else {
            newMessage = new db.Message({
                username: reciever,
                recieve: {
                    sender: sender,
                    message: message,
                    time: time,
                    iddate: iddate
                }
            })

            newMessage.save()

            return {
                message: newMessage,
                status: true,
                statusCode: 200
            }
        }
    })
}


getRecieverMessages = (sender, reciever) => {
    return db.Message.findOne({ username: sender })
        .then((message) => {
            if (message) {

                const recieverObjects = message.send.filter((obj) => obj.reciever === reciever);

                return {
                    recieverObjects,
                    status: true,
                    statusCode: 200,
                };
            }
            else {
                return {
                    receiverObjects: "No user found",
                    status: false,
                    statusCode: 404,
                };
            }
        })
        .catch((error) => {
            console.error(error);
            return {
                receiverObjects: [],
                status: false,
                statusCode: 500,
            };
        });

};



getsenderMessages = (sender, reciever) => {

    return db.Message.findOne({ username: reciever })
    
        .then((message) => {

            if (message) {

                const senderObjects = message.recieve.filter((obj) => obj.sender === sender);

                return {
                    senderObjects,
                    status: true,
                    statusCode: 200,
                };
            }
            else {
                return {
                    senderObjects: "No user found",
                    status: false,
                    statusCode: 404,
                };
            }
            
        })

        .catch((error) => {
            console.error(error);
            return {
                senderObjects: [],
                status: false,
                statusCode: 500,
            };
        });

};



module.exports = {
    register, login, moreDetails, posting, viewPosts, profile, viewPost, findPeople, newFollower, currentFollowers, update, deletePost,
    profileDelete, sendMessage, followersProfile, recieveMessage, getRecieverMessages, getsenderMessages
}