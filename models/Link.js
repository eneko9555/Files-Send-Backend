import mongoose from "mongoose"

const linkSchema = mongoose.Schema({
    url: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    original_name: {
        type: String,
        require: true
    },
    downloads: {
        type: Number,
        default:1
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    password: {
        type: String,
        default : null
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}) 

const Link = mongoose.model('Link', linkSchema )

export default Link