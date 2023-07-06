import multer from "multer";
import GridFsStorage from 'multer-gridfs-storage';

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