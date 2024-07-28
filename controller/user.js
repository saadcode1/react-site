const mongoose = require("mongoose");
const User=require("../models/user");
const Post =require("../models/post");
module.exports.signin=async (req,res)=>{
    try{ 
        let {email,username,password}=req.body;
          let ragisterUser=new User({
                email,
                username,
          })
         let user= await User.register(ragisterUser,password);
         req.login(user,(err)=>{
                if(err){
                  console.log(err);
                  return next(err);
                }
            });
          
            res.status(201).send(req.user);
        }catch(err){
              res.status(401).send(err.message);
        }
}
module.exports.loggedIn=(req,res)=>{
        try{ user=req.user;
          res.status(201).send(req.user);
        }catch(e){
          res.status(401).send(e.message);
        }
}

module.exports.postCreated = async (req, res) => {
  try { 
    const { description, image } = req.body;
    const post = new Post({ description, post: image, userId:req.user});
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: 'Failed to create post' });
  }
};