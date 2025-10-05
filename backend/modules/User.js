import mongoose from 'mongoose';

const userShema=mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    }
},{
    timestamps:true //this will auto create the createdAt && updatedAt
});

const User=mongoose.model("User",userShema);

export default User;