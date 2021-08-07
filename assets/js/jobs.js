// GLOBAL VARIABLES //
var searchFormEl = document.querySelector("#search-form");
var mainContainerEl = document.querySelector("#container");
var jobsUlEl = document.querySelector("#jobs-ul");
var resultLiId = 1

// array to hold the bookmarked elements
var bookmarkedAr = {
  title: [],
  url: [],
  date: []
};
let resultsAr = [];


// retrieve input from search bar that was placed in our URL using the GET method in out form.  This variable will be placed at the end of the API URL in our "getData" function as the parameter value. 
var url_string = window.location;
var url = new URL(url_string);
var nameIsh = url.searchParams.get("search");




// FETCH FUNTION // retrieves the data, converts the data from XML to JSON for object data handling and send that object to displayContent function
var getData = function() {

  var apiUrl = "https://remotive.io/api/remote-jobs?search=" + nameIsh;
  
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      if (!data.jobs.length) {
        var noResultsEl = document.createElement("h4");
        noResultsEl.textContent = "Sorry, no matches.  Please be sure to limit your search to tech industry jobs."
        noResultsEl.classList = "text-center";
        jobsUlEl.appendChild(noResultsEl);
      }
      displayContent(data.jobs.slice(0, 15));
      // console.log(data.jobs.slice(0, 15))

    })
  })
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
      jobLiEl.appendChild(bookmarkBtnEl)

    // fill the li with content we want to display from the jobs arrays
    var titleEl = document.createElement("h3");
    var titleAEl = document.createElement("a");
      titleAEl.setAttribute("href", data[i].url);
      titleAEl.setAttribute("target", "blank")
      titleAEl.textContent = data[i].title + " - " + data[i].company_name.toUpperCase();
      titleEl.appendChild(titleAEl);

    var urlEL = document.createElement("a");
      urlEL.setAttribute("href", data[i].url);
      urlEL.setAttribute("target", "blank");
      urlEL.classList = "search-link d-block";
      urlEL.textContent = data[i].url;

    var pEl = document.createElement("p");
      pEl.innerHTML = data[i].description;
      pEl.classList = "overflow-hidden";
      pEl.style.maxHeight = "80px"
      pEl.style.maxWidth = "75%"
    
    var dateEl = document.createElement("p");
      dateEl.textContent = moment(data[i].publication_date, moment.ISO_8601).format("L");

  

    // append content to the created li
    jobLiEl.appendChild(titleEl);
    jobLiEl.appendChild(urlEL);
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
  for (i = 0; i < resultsAr.length; i++) {
    var buttonEl = resultsAr[i].job.childNodes[0];
    buttonEl.addEventListener("click", function() {
      this.textContent = "liked";
      this.classList = "btn btn-secondary p-0 btn-small fw-lighter"
      // console.log(this.parentElement.childNodes);
      bookmarkedAr.title.push(this.parentElement.childNodes[1].textContent)
      bookmarkedAr.url.push(this.parentElement.childNodes[2].textContent)
      bookmarkedAr.date.push(this.parentElement.childNodes[3].textContent);
      localStorage.setItem("bookmarked", JSON.stringify(bookmarkedAr));

      console.log(bookmarkedAr);
    });  
  }
}

function loadBookmarked() {
  var stored = JSON.parse(localStorage.getItem("bookmarked"));
  // console.log(stored);
  if(!stored) {
    var bookmarkedAr = {
      title: [],
      url: [],
      date: []
    };
    console.log("nothing to load");
  } else {
    console.log(stored.title[0]);
  }
}

// CALLS //
loadBookmarked();
getData();