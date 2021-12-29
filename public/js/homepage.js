
const uploadBtn = document.querySelector("#upload-btn") ;
uploadBtn.addEventListener("click", function(event)
{
    
} ) ;
document.getElementById("file-upload").addEventListener("change", validateFile) ;
function validateFile(){
    const {name:name} = this.files[0];
    let fileExt= name.split(".")[1] ;
    if ( "csv" != fileExt )
    {
        alert("file type not allowed");
        this.value = null;
    }
}

