import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import { gridBucket } from "../server.js";

function postFileUpload() {
  const storage = new GridFsStorage.GridFsStorage({
    url: "mongodb+srv://cscc01:123@cluster0.4h2rq8m.mongodb.net/CSCC01-200-OK-DB?retryWrites=true&w=majority",
    file: (req, file) => {
      const filename = `${Date.now()}_${file.originalname}`;
      const fileInfo = {
        filename: filename,
        bucketName: "postFiles",
      };
      return fileInfo;
    },
  });

  return multer({ storage });
}

function postFileRetrieveAll(req, res, next) {
  // gfs.
  gfs.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: "no files found",
      });
    }

    files.map((file) => {
      if (
        file.contentType === "image/jpg" ||
        file.contentType === "image/png" ||
        file.contentType === "image/jpeg"
      ) {
        file.isImage = true;
      } else {
        file.isImage = false;
      }
    });

    res.status(200).json({
      success: true,
      files,
    });
  });

  next();
}

async function postFileRetrieveOne(req, res) {
  console.log(req.params.id);
  // gfs.
  try {
    let fileid = req.params.id;
    let file = await gridBucket.files.find({ fileName: fileid });

    console.log(3);
  } catch (e) {
    return res.status(400).send(e.message);
  }

  // next();
}

export { postFileUpload, postFileRetrieveAll, postFileRetrieveOne };
