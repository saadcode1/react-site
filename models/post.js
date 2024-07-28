const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const postSchema=new Schema({
    userId:{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User' 
    },
    description:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true,
    }
})
module.exports=mongoose.model("Post",postSchema);