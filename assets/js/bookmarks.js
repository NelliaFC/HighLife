
// DISPLAY RESULTS FROM LOCAL STORAGE //  In order to do this we take the data from local storage (gotten) and loop through it using the "for" loop iterator.  As we loop through the data we create elements to display in the page
function displayLoadedResults() {

  var bookmarkedJobsList = JSON.parse(localStorage.getItem("bookmarked"));
    console.log(bookmarkedJobsList)

 for (i = 0; i < bookmarkedJobsList.length; i++) {
   var title = bookmarkedJobsList[i].title;
   var location = bookmarkedJobsList[i].location;
   var url = bookmarkedJobsList[i].url;
   var date = bookmarkedJobsList[i].date;
   var htmlCode = '<li class="collection-item avatar blue lighten-5">'+
   '<i class="material-icons circle blue darken-4">work</i>'+
  '<span class="title">'+title+'</span>'+ 
   '<p>'+location +'<br>'+url +'<br>'+
      date +
   '</p>'+
   '<a href="#!" class="secondary-content"><i class="material-icons red-text">favorite</i></a>'+
 '</li>'
   $('#listJobFavorites').append(htmlCode);
 }  
}





// CALLS //
displayLoadedResults();


