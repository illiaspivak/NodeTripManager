const btn = document.getElementById("addTrip");

btn.addEventListener("click", () =>{
    const title = document.getElementById("tripTitle").value;
    const place = document.getElementById("place").value;
    const distance = parseInt(document.getElementById("distance").value);
    const difficultyLevel = parseInt(document.getElementById("difficultyLevel").value);
    
    const object = {title, place, distance, difficultyLevel};
    console.log(object);
    // const jsonData=JSON.stringify(object);
    // console.log(jsonData);

    // let trip = {"title": title, "place": place, "distance":distance, "difficultyLevel":difficultyLevel};

    // fetch('http://localhost:3000/trip/new', {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json',
    //     },
    //     mode:"no-cors",
    //     body: object,
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    // })
    // .catch((error) => {
    //      console.error('Error:', error);
    //  });
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