const mongoose = require("mongoose") ;
const {Schema} = mongoose ;


// creating schema for file 
const fileSchema = new Schema ( {
    name:{
        type:String,
        required:true,
    },
    data: [{
        type: Object,
        required:true
    }]
},
{
    timestamps:true 
}) ;

const Files = mongoose.model("Files",fileSchema);


module.exports = Files ;