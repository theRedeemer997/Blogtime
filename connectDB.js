// mongoose is a object modelling tool to work in an asynchronous environment
const mongoose = require('mongoose');
const Post = require("./models/Post");
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.mongoUri);
        await Post.createCollection();
        console.log("Db successfully connected ",conn.connection.host);
    }
    catch(err){
        console.log("DB didin't connected", err.message);
    }
}

module.exports = connectDB;