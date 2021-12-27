const express= require("express");
const router = express.Router() ;
const app = express();
const fileController = require("../controllers/index") ;


router.get("/" ,fileController.homePage) ;
router.post("/upload",fileController.uploadFile );
router.get("/view-file", fileController.viewFile)
module.exports = router ;