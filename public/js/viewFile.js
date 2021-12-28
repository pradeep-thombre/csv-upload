
    const searchInput = document.querySelector("#search-input");
    const searchBtn = document.querySelector("#search-btn") ;
    const tableContainer= document.querySelector("#table-container");
    const table = document.querySelector("#table") ;
    const tBody = document.querySelector("#t-body") ;
    
    // this creates a contant copy of initial table when the page loads
    const arr = Array.from(tBody.children).map((item)=>
    {
        return "<tr>"+item.innerHTML+"</tr>" ;
    }) ;
    // console.log("yoyoyo",arr );
    // to store search results 
    let searchResults=[];

    searchBtn.addEventListener("click", function(event)
    {
        event.preventDefault() ;
        // console.log(tBody.children) ;
        // if the search bar is empty we update the table to its initial state which is the one when the page first loads
        if (searchInput.value == "")
        {
            console.log("inside if'' " );
            document.getElementById("t-body").innerHTML=arr.join(" ").trim() ;
            return ;
        }
        // else call the search fn on table
        searchTable() ;
    } ) ;

    function searchTable ()
    {
        let length = tBody.children.length;
        let searchQuery = searchInput.value ;
        searchResults=[];
        // this is a live HTML Collection ; rows refers to rows of table
        let rows =tBody.children ;
        for (let i=0 ;i<length;i++)
        {
            row=rows[i] ;
             if ( row.innerText.toLowerCase().search(searchQuery.toLowerCase()) > -1  )
             {
                //  console.log("found a match ",row.innerHTML.trim());
                 searchResults.push("<tr>"+row.innerHTML.trim()+"</tr>") ;
                //  console.log(searchResults)
             }
        }
        // update the table with search Results
        document.getElementById("t-body").innerHTML=searchResults.join(" ")
        
    }
    


    
$(document).ready(function() {
    let table=document.getElementById('table');
    table.DataTable();
});
