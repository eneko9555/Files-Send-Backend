import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
     email:{
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    uploadFiles: [
        {
            type: String,
            default: null
        }
    ]
}) 

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function(passwordReq){
    return await bcrypt.compare( passwordReq, this.password )
}

const User = mongoose.model('User', userSchema )

export default User