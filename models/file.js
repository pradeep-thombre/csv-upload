const mongoose = require("mongoose") ;
const {Schema} = mongoose ;
const multer = require("multer") ;
const path = require("path") ;
const FILE_PATH = path.join("/public/uploads/csv files");
const fileSchema = new Schema ( {
    name:{
        type:String,
        required:true,
    },
    filePath:{
        type:String,
        required:true ,
    }
},
{
    timestamps:true 
}) ;
// setting up multer to use with database
let storage = multer.diskStorage ({
    destination :function (req , file , cb)
    {
        cb(null ,path.join(__dirname,"..",FILE_PATH) ) ;
    },
    filename: function (req ,file ,cb)
    {
        cb(null , file.fieldname+'-'+Date.now()+path.extname(file.originalname) ) ;
    }
}) ;
// static fns 
fileSchema.statics.uploadedFile = multer( {storage:storage}).single("file") ;
fileSchema.statics.filePath = FILE_PATH ; 
const Files = mongoose.model("Files",fileSchema);


module.exports = Files ;