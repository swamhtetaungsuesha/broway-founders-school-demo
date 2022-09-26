import nextConnect from 'next-connect';
import multer from 'multer';
import mongoose from 'mongoose';

import { GridFsStorage } from 'multer-gridfs-storage';


const mongoURI = process.env.MONGODB_URL;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db,{
      bucketName:'uploads'
  })  
  
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
          const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
          
      });
    }
  });

  const upload = multer({ storage})

apiRoute.use(upload.single('file'));

apiRoute.post((req, res) => {

  res.status(200).json({ 
    fileId : req.file.id,
    fileName: req.file.filename,
    
  });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};