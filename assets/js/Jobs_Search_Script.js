// GLOBAL VARIABLES //
var searchFormEl = document.querySelector("#search-form");
var mainContainerEl = document.querySelector("#container");
var jobsUlEl = document.querySelector("#jobs-ul");


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
      console.log(data.jobs.slice(0, 15))

    })
  })
}

// DISPLAY SEARCH CONTENT FUNCTION // recieves data from search query and assigns variables in order to create the list elemts to house each individual result.
var displayContent = function(data) {

  // if (!data) {
  //   var noResultsEl = document.createElement("li");
  //   jobsUlEl.appendChild(noResultsEl);
  //   var noResultsTxt = document.createElement("h3");
  //   noResultsTxt.textContent = "Sorry, no mathces."
  //   noResultsEl.appendChild(noResultsTxt);
  // } else {
    for (i = 0; i < data.length; i++) {
      // Create an li for each job posting
      var jobLiEl = document.createElement("li");
      jobLiEl.classList = "search-result"
      jobLiEl.style.marginBottom = "50px"
      jobsUlEl.appendChild(jobLiEl);
  
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
      
  
      var dateEl = document.createElement("span");
      dateEl.textContent = moment(data[i].publication_date, moment.ISO_8601).format("L");
  
      // var categoryEl = document.createElement("h4");
      // categoryEl.textContent = data[i].category;
  
  
  
      // append content to the created li
      jobLiEl.appendChild(titleEl);
      jobLiEl.appendChild(urlEL);
      jobLiEl.appendChild(dateEl);
      jobLiEl.appendChild(pEl);
      // jobLiEl.appendChild(categoryEl);
    // }
  }
  
  // description //

}

// CALLS //
getData();