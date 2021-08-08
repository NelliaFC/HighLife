
var bookmarksUlEl = document.querySelector("#bookmarks-container");
var gotten = JSON.parse(localStorage.getItem("bookmarked"));
var loadedResultsAr = [];


// DISPLAY RESULTS FROM LOCAL STORAGE //  In order to do this we take the data from local storage (gotten) and loop through it using the "for" loop iterator.  As we loop through the data we create elements to display in the page
function displayLoadedResults() {
  console.log(gotten);

  for (i = 0; i < gotten.length; i++) {
    // Create elements to hold data from localStorage

    // CREATE TITLE ELEMENT
    var title = document.createElement("h3");
      // add classes to style the title element
      title.classList = ""
      title.textContent = gotten[i].title;

    // CREATE URL ELEMENT
    var url = document.createElement("a");
      // add classes to style the url element
      url.classList ="";
      url.setAttribute("href", gotten[i].url);
      url.textContent = gotten[i].url.substring(0, 19);

    var location = document.createElement("h5");
      // add classes to style the url element
      location.classList = "";
      location.textContent = gotten[i].location

    
    // CREATE DATE ELEMENT
    var date = document.createElement("p");
      // add classes to style the url element
      date.classList = "";
      date.textContent = gotten[i].date;





    // APPEND THE ELEMENTS TO THE BOOKMARKS UL
    bookmarksUlEl.appendChild(title);
    bookmarksUlEl.appendChild(url);
    bookmarksUlEl.appendChild(location);
    bookmarksUlEl.appendChild(date);
  }
}




// CALLS //
displayLoadedResults();



// var bookmarkedJobsList = JSON.parse(localStorage.getItem("bookmarked"));
// console.log(bookmarkedJobsList)

// for (i = 0; i < bookmarkedJobsList.title.length; i++) {
//   var title = bookmarkedJobsList.title[i];
//   var url = bookmarkedJobsList.url[i];
//   var date = bookmarkedJobsList.date[i];
//   var htmlCode = '<li class="collection-item avatar blue lighten-5">'+
//   '<i class="material-icons circle blue darken-4">home</i>'+
//   '<span class="title">'+title+'</span>'+
//   '<p>'+url +'<br>'+
//      date +
//   '</p>'+
//   '<a href="#!" class="secondary-content"><i class="material-icons red-text">favorite</i></a>'+
// '</li>'
//   $('#listJobFavorites').append(htmlCode);
// }


