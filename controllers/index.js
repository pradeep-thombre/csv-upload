const File = require("../models/file");
const csv = require('csv-parser');
const fs = require("fs");
const path = require("path");

module.exports.homePage = async (req, res) => {
    const allFiles = await File.find({}).sort({'createdAt':"desc"});
    res.render("homepage",{files:allFiles});
}

module.exports.uploadFile = (req, res) => {
    File.uploadedFile(req, res, function (err) {
        if (err) {
            console.log("multer error ", err);
        }
       
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
    console.log(fileId) ;
    let fileObj = await File.findById(fileId);
    var headerStream =await fs.createReadStream(path.join(__dirname, "..", fileObj.filePath))
    .pipe(csv())
    .on('headers', (header_arr) => {
        headers = header_arr;
        console.log( header_arr);
        headerStream.destroy();
    }) ;
    var readStream = await fs.createReadStream(path.join(__dirname, "..", fileObj.filePath))
        .pipe(csv({skipLines :skip}))
        
        .on('data', (row) => {
            // console.log(row) ;
            dataArray.push(row);
            limit-- ;
            if (limit==0)
            {
                readStream.destroy();
                console.log("csv file successfully processed");
            // console.log(headers);
            // console.log(dataArray)
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
            // console.log(headers);
            // console.log(dataArray);
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