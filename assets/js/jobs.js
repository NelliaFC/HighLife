// GLOBAL VARIABLES //
var searchFormEl = document.querySelector("#search-form");
var mainContainerEl = document.querySelector("#container");
var jobsUlEl = document.querySelector("#jobs-ul");
var resultLiId = 1

// array to hold the bookmarked elements
var bookmarkedAr = [];
let resultsAr = [];


// retrieve input from search bar that was placed in our URL using the GET method in out form.  This variable will be placed at the end of the API URL in our "getData" function as the parameter value. 
var url_string = window.location;
var url = new URL(url_string);
var keyword = url.searchParams.get("keyword");
var state = url.searchParams.get("state")




// FETCH FUNTION // retrieves the data, converts the data from XML to JSON for object data handling and send that object to displayContent function
// var getData = function() {
var getJoobleData = function() {
  var url = "https://jooble.org/api/";
  var key = "2877bf7c-37ce-47d1-9328-901ec0b873a4";
  var params = "{ keywords: '" + keyword + "', location: '" + state + "'}"
  console.log(params);
  
  //create xmlHttpRequest object
  var http = new XMLHttpRequest();
  //open connection. true - asynchronous, false - synchronous
  http.open("POST", url + key, true);
  
  //Send the proper header information
  http.setRequestHeader("Content-type", "application/json");
    
  //Callback when the state changes
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
      var response = JSON.parse(http.responseText);
      displayContent(response.jobs.slice(0, 20));
      // geocorderApi(response.jobs.slice(0, 10));
      console.log(response.jobs);
    }
  }
  //Send request to the server
  http.send(params);
}



// DISPLAY SEARCH CONTENT FUNCTION // recieves data from search query and assigns variables in order to create the list elemts to house each individual result.
var displayContent = function(data) {

  for (i = 0; i < data.length; i++) {
    // Create an li for each job posting
    var jobLiEl = document.createElement("li");
      jobLiEl.classList = "search-result"
      jobLiEl.style.marginBottom = "50px"
      jobLiEl.id = "result-" + resultLiId++
      jobsUlEl.appendChild(jobLiEl);

    var bookmarkBtnEl = document.createElement("button");
      bookmarkBtnEl.textContent = "Like";
      bookmarkBtnEl.classList = "btn btn-warning btn-secondary p-0 fs-6 fw-light";
      jobLiEl.appendChild(bookmarkBtnEl);

    // fill the li with content we want to display from the jobs arrays
    var titleEl = document.createElement("h3");
    var titleAEl = document.createElement("a");
      titleAEl.setAttribute("href", data[i].link);
      titleAEl.setAttribute("target", "blank")
      titleAEl.textContent = data[i].title + " - " + data[i].company.toUpperCase();
      titleEl.appendChild(titleAEl);

    var urlEL = document.createElement("a");
      urlEL.setAttribute("href", data[i].link);
      urlEL.setAttribute("target", "blank");
      urlEL.classList = "search-link d-block";
      urlEL.textContent = data[i].link.substring(0, 19);

    var locationEl = document.createElement("h6");
      locationEl.textContent = data[i].location;


    var pEl = document.createElement("p");
      pEl.innerHTML = data[i].snippet;
      pEl.classList = "overflow-hidden";
      pEl.style.maxHeight = "80px"
      pEl.style.maxWidth = "75%"
    
    var dateEl = document.createElement("p");
      dateEl.textContent = moment(data[i].updated, moment.ISO_8601).format("L");

  

    // append content to the created li
    jobLiEl.appendChild(titleEl);
    jobLiEl.appendChild(urlEL);
    jobLiEl.appendChild(locationEl);
    jobLiEl.appendChild(dateEl);
    jobLiEl.appendChild(pEl);

    //create an object for each result and push to the global array "resultsAr"
    var results = {
      job: jobLiEl,
    };
    resultsAr.push(results);
  }
  bookmarkedJobs();
}

// SEND BOOKMARKED JOBS TO LOCAL STORAGE //  We will use the button to send informationfrom the button's parent to a global array then into local storage and repopulate that information in the bookmarks page
function bookmarkedJobs() {
  var bookmarkedJobsList = JSON.parse(localStorage.getItem("bookmarked"));
  if (bookmarkedJobsList) {
    bookmarkedAr = bookmarkedJobsList
  }


  for (i = 0; i < resultsAr.length; i++) {
    var buttonEl = resultsAr[i].job.childNodes[0];
    buttonEl.addEventListener("click", function() {
      this.textContent = "liked";
      this.classList = "btn btn-secondary p-0 btn-small fw-lighter"
      console.log(this.parentElement.childNodes);
      var thisTitle = this.parentElement.childNodes[1].textContent;
      var thisUrl = this.parentElement.childNodes[2].textContent;
      var thisLocation = this.parentElement.childNodes[3].textContent;
      var thisDate = this.parentElement.childNodes[4].textContent;
      bookmarkedAr.push({
        title: thisTitle,
        url: thisUrl,
        location: thisLocation,
        date: thisDate
      });

      // bookmarkedAr.title.push(thisTitle)
      // bookmarkedAr.url.push(thisUrl)
      // bookmarkedAr.date.push(thisDate);
      localStorage.setItem("bookmarked", JSON.stringify(bookmarkedAr));
    });  
  }
}

function loadBookmarked() {
  var stored = JSON.parse(localStorage.getItem("bookmarked"));
  if (!bookmarkedAr) {
    console.log("nothing Loaded");
  }
  console.log(stored)
  if (!stored) {
    console.log("nothing stored");
    return;
  } else {
    for (i = 0; i < stored.length; i++) {

    }


      // bookmarkedAr.title.push(stored.title);
      // bookmarkedAr.url.push(stored.url);
      // bookmarkedAr.date.push(stored.date);
      // console.log(bookmarkedAr);

  }


}


// CALLS //
loadBookmarked();
getJoobleData();
// getData();
