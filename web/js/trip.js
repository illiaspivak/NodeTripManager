$( ()=>{
    console.log("Hello< ILya!")
    $.ajax({
        url: "http://localhost:3000/trip",
        type: "get",
        
        statusCode: { 
            200: (result)=>{ 
                for(var index in result){
                    const title = result[index].title
                    const place = result[index].place
                    const distance = result[index].distance
                    const difficultyLevel = result[index].difficultyLevel
                    const placeVisited = result[index].placeVisited
        
                    var text = title + " (" + place + ") distance: " + 
                    distance + "; difficulty level: " + difficultyLevel +
                    "; place visited: " + placeVisited;
                    console.log(text);
                    var newElement = $("<div ></div>").text(text);
                    var elementBR=$("<br/>");
                    $("#parrent").append(newElement,  elementBR); 
                }
            },
            400: (err)=>{ console.log('Bad request, ')},
            404: (err)=>{ console.log('Not found !')}
        },
    })
});