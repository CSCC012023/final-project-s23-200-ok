import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import { gridBucket } from "../server.js";

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

function postFileRetrieveAll(req, res, next) {
    // gfs.
    gfs.find().toArray((err,files) => {
        if (!files || files.length === 0){
            return res.status(200).json({
                success: false,
                message: "no files found"
            });
        }

        files.map(file => {
            if (file.contentType === 'image/jpg' ||
                file.contentType === 'image/png' ||
                file.contentType === 'image/jpeg'){
                    file.isImage = true;
            } else{
                file.isImage = false;
            }
        })

        res.status(200).json({
            success: true,
            files
        })
    })

    next();
}

async function postFileRetrieveOne(req, res)  {
    console.log(req.params.id);
    // gfs.
    try{
        // var items = await gfs.find()
        // console.log(items);
        // items.toArray((err,files) => {
        //     if (!files || files.length === 0){
        //         console.log("200 good");

        //         return res.status(200).json({
        //             success: false,
        //             message: "no files found"
        //         });
        //     }

        //     console.log("checkpoint");
        //     files.map(file => {
        //         if (file.contentType === 'image/jpg' ||
        //             file.contentType === 'image/png' ||
        //             file.contentType === 'image/jpeg'){
        //                 file.isImage = true;
        //         } else{
        //             file.isImage = false;
        //         }
        //     })

        //     console.log("200 good");
        //     console.log(files);
        //     res.status(200).json({
        //         success: true,
        //         files
        //     })
        // })
        let fileid = req.params.id;
        console.log(1)
        let file = await gridBucket.files.find({fileName: fileid});
        console.log(file);
        console.log(2);
        // file.toArray(
        //     (err, result)=> {
        //         if (err){
        //             console.log(1);
        //             return res.status(400).send(err.message)
        //         }
        //         else{
        //             if (!result || result.length==0){
        //                 console.log(2);
        //                 return res.status(201).send("File does not exists")
        //             }
        //             else {
        //                 // gridBucket.openDownloadStream(ObjectId(fileid)).pipe(res)
        //                 gridBucket.openDownloadStreamByName(fileid).pipe(res)
                        
        //             }
        //         }
        //     }
        // )
        console.log(3);


    } catch (e){
        return res.status(400).send(e.message);
    }
//    return res.status(500).send("unknown err");

    // next();
};

export { postFileUpload, postFileRetrieveAll, postFileRetrieveOne } ;
