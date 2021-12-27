
const uploadBtn = document.querySelector("#upload-btn") ;
uploadBtn.addEventListener("click", function(event)
{
    
} ) ;
document.getElementById("file-upload").addEventListener("change", validateFile) ;
function validateFile()
{
    console.log(this.files)
    const {name:name} = this.files[0];
    console.log(name) ;
    let fileExt= name.split(".")[1] ;
    console.log(fileExt)
    if ( "csv" != fileExt )
    {
        alert("file type not allowed");
        this.value = null;
    }
}

