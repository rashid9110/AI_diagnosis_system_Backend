
// const multer=require('multer');

// const path=require('path');

// const storageConfiguration=multer.diskStorage({
//     destination:(req,file,next)=>{
//         next(null,'uploads/');
//     },
//     filename:(req,file,next)=>{
//         console.log(file);
//         next(null,`${Date.now()}${path.extname(file.originalname)}`);
//     }
// })

// const uploader=multer({storage:storageConfiguration});
// module.exports=uploader;


const multer = require('multer');

// ✅ Use memory storage (BEST for Render)
const storage = multer.memoryStorage();

const uploader = multer({ storage });

module.exports = uploader;