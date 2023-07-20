import multer from "multer";
import GridFsStorage from 'multer-gridfs-storage';
import mongoose, { mongo } from "mongoose"
import MongoClient from "mongodb"
import { gridBucket } from "../server.js";
import asyncHandler from "express-async-handler";


// import dotenv from "dotenv";
// dotenv.config();
// let mongoose 
// var gfs;
// // mongoose.connect(process.env.MONGO_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// // });
// const connect = await mongoose.connection;
// connect.once("open", () => {
//     gfs = new mongoose.mongo.GridFSBucket(connect.db,{
//         bucketName: "postFiles"
//     })
//     console.log(gfs.find());
// });



function postFileUpload(){

    const storage = new GridFsStorage.GridFsStorage({
    url: "mongodb+srv://cscc01:123@cluster0.4h2rq8m.mongodb.net/CSCC01-200-OK-DB?retryWrites=true&w=majority",
    file: (req, file) => { 
            const filename = `${Date.now()}_${file.originalname}`;
            const fileInfo = {
                filename: filename,
                bucketName: 'postFiles'
            };
            return fileInfo;
        }
    
    });

    return multer({ storage });
}



export { postFileUpload } ;