const btn = document.getElementById("addTrip");

btn.addEventListener("click", () =>{
    const title = document.getElementById("tripTitle").value;
    const place = document.getElementById("place").value;
    const distance = parseInt(document.getElementById("distance").value);
    const difficultyLevel = parseInt(document.getElementById("difficultyLevel").value);
    
    const object = {title, place, distance, difficultyLevel};
    

    $.ajax({
        url: "http://localhost:3000/trip/new",
        type: "post",
        //dataType: "json",
        //contentType: "application/json",
        data: object,
        success: (result)=>{
            console.log(result);
        },
        error:  (err)=>{
            console.log("Error: ",err);
        }
    })
})