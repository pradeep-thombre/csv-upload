// importing all required library and files 
const File = require("../models/file");
const csv = require("csvtojson");
const upload = require("../config/multer");

// rendering home page 
module.exports.homePage = async (req, res) => {
    // fetching all uploaded  files  in desc order of creation
    const allFiles = await File.find({}).sort({'createdAt':"desc"});
    res.render("homepage",{files:allFiles});
}


// upload file action 
module.exports.uploadFile =async (req, res) => {
    try {
        upload.single("file");
        const dataArr = await csv().fromString(req.file.buffer.toString());

        // Create new user
        let file =await File.create({
          name: req.file.originalname,
          data:dataArr
        });
        
        return res.redirect("/view-file?fileId="+file._id);
    } catch (err) {
        console.log("err",err);
    }
}
module.exports.viewFile = async (req, res) => {
    
    let fileId = req.query.fileId;
    let fileObj = await File.findById(fileId);
    filename=fileObj.name;
    dataArr=fileObj.data;
    maxhight=0;
    var maxItem;
    for(let item of dataArr){
        if(maxhight<Object.keys(item).length){
            maxhight=Object.keys(item).length;
            maxItem=item;
        }
    }
    headers=Object.keys(maxItem);
    // for(let item of dataArr){
    //         for(let i=0;i<headers.length;i++) {
    //             // console.log(headers[i])
    //             console.log(item[headers[i]]);
    //         }
    // }

    res.render("table", 
    {
        name:filename,
        headers: headers, 
        dataArr: dataArr,
        homeLink:true 
                        
    })

}