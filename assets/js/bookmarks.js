
var gotten = JSON.parse(localStorage.getItem("bookmarked"));
console.log(gotten)

for (i = 0; i < gotten.title.length; i++) {
  var title = document.createElement("h3");
  title.textContent = gotten.title[i];
  var url = document.createElement("a");
  url.setAttribute("href", gotten.url[i]);
  url.setAttribute("target", "blank");
  url.textContent = gotten.url[i];
  var date = document.createElement("p");
  date.classList = "mb-5"
  date.textContent = gotten.date[i];

  document.querySelector("body").appendChild(title);
  document.querySelector("body").appendChild(url);
  document.querySelector("body").appendChild(date)
}
