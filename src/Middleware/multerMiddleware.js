// const multer = require('multer');
// const path = require('path');

// // Use /tmp for safe writing in Render
// const storageConfiguration = multer.diskStorage({
//   destination: (req, file, next) => {
//     next(null, '/tmp'); // ✅ render-compatible
//   },
//   filename: (req, file, next) => {
//     console.log('Uploading file:', file.originalname);
//     next(null, `${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const uploader = multer({ storage: storageConfiguration });

// module.exports = uploader;

const multer=require('multer');

const path=require('path');

const storageConfiguration=multer.diskStorage({
    destination:(req,file,next)=>{
        next(null,'uploads/');
    },
    filename:(req,file,next)=>{
        console.log(file);
        next(null,`${Date.now()}${path.extname(file.originalname)}`);
    }
})

const uploader=multer({storage:storageConfiguration});
module.exports=uploader;