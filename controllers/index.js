// importing all required library and files 
const File = require("../models/file");
const csv = require("csvtojson");
const upload = require("../config/multer");

// rendering home page 
module.exports.homePage = async (req, res) => {

    // fetching all uploaded  files  in desc order of creation
    const allFiles = await File.find({}).sort({'createdAt':"desc"});

    // passing all files to ejs 
    res.render("homepage",{files:allFiles});
}


// upload file action 
module.exports.uploadFile =async (req, res) => {
    try {
        upload.single("file");
        // converting csv data into array of json object 
        const dataArr = await csv().fromString(req.file.buffer.toString());

        // Create new file
        let file =await File.create({
          name: req.file.originalname,
          data:dataArr
        });
        
        // returning to view files page to show data 
        return res.redirect("/view-file?fileId="+file._id);
    } catch (err) {
        console.log("err",err);
    }
}
module.exports.viewFile = async (req, res) => {
    // fetching if from request 
    let fileId = req.query.fileId;
    let fileObj = await File.findById(fileId);
    // getting all data 
    filename=fileObj.name;
    dataArr=fileObj.data;
    maxhight=0;
    var maxItem;

    // finding headers 
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

//removing file
module.exports.removeFile = async (req, res) => {
    // removing file 
    const file = await File.findByIdAndDelete(req.params.id);
    return res.redirect('/');
}