import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // set the directory where uploaded files will be stored
    cb(null, '/home/ryan/Desktop/jobify/public/uploads');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    // set the name of the uploaded file
    cb(null, fileName);
  },
});
const upload = multer({ storage });

export default upload;
































// import multer from "multer";

// //use multer to handle file uploads

// const storage = multer.diskStorage({
//     //cb is a callback function
//     //cb's first arg is for if there is an error, second arg is the route
//     destination: (req,file,cb) => {
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname
//         cb(null, fileName)
//     },
// })


// const upload = multer({storage})


// export default upload;