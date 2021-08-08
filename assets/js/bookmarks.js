
var bookmarkedJobsList = JSON.parse(localStorage.getItem("bookmarked"));
console.log(bookmarkedJobsList)

for (i = 0; i < bookmarkedJobsList.title.length; i++) {
  var title = bookmarkedJobsList.title[i];
  var url = bookmarkedJobsList.url[i];
  var date = bookmarkedJobsList.date[i];
  var htmlCode = '<li class="collection-item avatar blue lighten-5">'+
  '<i class="material-icons circle blue darken-4">home</i>'+
  '<span class="title">'+title+'</span>'+
  '<p>'+url +'<br>'+
     date +
  '</p>'+
  '<a href="#!" class="secondary-content"><i class="material-icons red-text">favorite</i></a>'+
'</li>'
  $('#listJobFavorites').append(htmlCode);
}

