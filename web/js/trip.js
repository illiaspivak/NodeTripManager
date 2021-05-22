function complete(element){
    $.ajax({
        url: "http://localhost:3000/trip/visit?title="+element.value,
        type: "put",
        statusCode: {
            200: (result)=>{
                  location.reload();
            }
        }

    });

}
 
 $( ()=>{
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
                    distance + "; difficulty level: " + difficultyLevel
                    if(placeVisited==true)
                     text= text+ " place visited: "+placeVisited;
                     if(placeVisited==false)
                              text=text+"<br/><BUTTON onClick=\"complete(this)\" value=\""+title+"\">(Complete task)</BUTTON>";
                     console.log(text);
                     var newElement = $("<div></div>").html(text);
                     var elementBR=$("<br/>");
                     $("#parrent").append(newElement, elementBR);    
                 }
             },
             400: (err)=>{ console.log('Bad request, ')},
             404: (err)=>{ console.log('Not found !')}
         },
      
     })
   
 });