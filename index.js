const express = require("express") ;
const app = express() ;
const port = process.env.PORT ||8000;

const expressLayout = require("express-ejs-layouts");
const mongoose = require("./config/mongoose")
// setup middlewares

app.set("view engine","ejs") ;
app.set("views","./views");

app.use(expressLayout);
app.use(express.static("./public")) ;

app.set("layout  extractStyles" , true );
app.set("layout  extractScripts" , true );

app.use("/", require("./routes"));
app.use(express.urlencoded({extended: true}));

app.listen(port , (err)=>
{
    if(err)
        console.log("there was an error in starting the server");
    console.log("server is running fine ",port) ;
})