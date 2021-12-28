// importing all required library and files 
const File = require("../models/file");
const csv = require('csv-parser');
const fs = require("fs");
const path = require("path");


// rendering home page 
module.exports.homePage = async (req, res) => {
    // fetching all uploaded  files  in desc order of creation
    const allFiles = await File.find({}).sort({'createdAt':"desc"});
    res.render("homepage",{files:allFiles});
}


// upload file action 
module.exports.uploadFile = (req, res) => {
    File.uploadedFile(req, res, function (err) {
        if (err) {
            console.log("multer error ", err);
        }
    //    creating a file with as uploaded data
        File.create({
            name: req.file.originalname
            , filePath: File.filePath + "/" + req.file.filename
        })
        return res.redirect("back");
    })
}
module.exports.viewFile = async (req, res) => {
    let headers = [];
    let dataArray = [];

    // or rather use id here
    let fileId = req.query.fileId;
    let pageNo = parseInt(req.query.page) ;

    // skip lines as
    let skip= pageNo*10 ;let limit = 10;
    if (pageNo==0)
    {
        skip=0 ;
    }
    let paginationObj = {} ;
    
    let fileObj = await File.findById(fileId);
    var headerStream =await fs.createReadStream(path.join(__dirname, "..", fileObj.filePath))
    .pipe(csv())
    .on('headers', (header_arr) => {

        // headers of the table 
        headers = header_arr;
        headerStream.destroy();
    }) ;
    var readStream = await fs.createReadStream(path.join(__dirname, "..", fileObj.filePath))
        .pipe(csv({skipLines :skip}))
        .on('data', (row) => {
            
            // fetching all rows  and pushing into array
            dataArray.push(row);
            limit-- ;
            // if limit is reached 
            if (limit==0){
                readStream.destroy();
                console.log("csv file successfully processed");
                
                paginationObj["prevClass"]=((pageNo <= 0)?"disabled":"") ;
                paginationObj["nextClass"]=("") ;

                res.render("viewFile", {
                    headers: headers
                    , dataArray: dataArray,
                    pageNo :pageNo,
                    fileId:fileId,
                    paginationObj :paginationObj ,
                    homeLink:true 
                    
                })
            }

           
        })
        .on('end', () => {
            console.log("csv file successfully processed");
            // all data has been processed 
            paginationObj["prevClass"]=((pageNo <= 0)?"disabled":"") ;
            paginationObj["nextClass"]=("disabled") ;
            res.render("viewFile", {
                headers: headers
                , dataArray: dataArray,
                pageNo :pageNo,
                fileId:fileId,
                paginationObj :paginationObj,
                homeLink:true 
            })
        });

}