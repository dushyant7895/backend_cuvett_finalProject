const mongoose=require("mongoose")

const folderDatabase=new mongoose.Schema({
    foldername:{
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:true})


module.exports=mongoose.model("Folder",folderDatabase)