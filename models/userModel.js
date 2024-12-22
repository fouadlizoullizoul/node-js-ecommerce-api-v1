const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
            max: 32
        },
        slug:{
            type: String,
            lowercase: true
        },
        email:{
            type: String,
            required: [true, 'Please enter your email'],
            lowercase:true,
            unique: true
        },
        phone:String,
        profileImg:String,
        password:{
            type: String,
            required: [true, 'Please enter your password'],
            minlength: [6, 'Your password must be at least 6 characters'],
        },
        role:{
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    }, 
{ timestamps: true }
);
const User = mongoose.model('User', userSchema);
module.exports = User;