$( ()=>{
    console.log("Hello< ILya!")
    $.ajax({
        url: "http://localhost:3000/trip",
        type: "get",
        
        success: (result)=>{
            console.log(result);
        },
        error:  (err)=>{
            console.log("Error: ",err);
        }
    })
});