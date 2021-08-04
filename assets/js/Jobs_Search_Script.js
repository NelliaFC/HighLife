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
      displayContent(data.jobs.slice(0, 50));
      console.log(data.jobs.slice(0, 50))
    })
  })
}

// DISPLAY CONTENT FUNCTION // recieves data and assigns variables in order to create the list elemts to house each individual result.
var displayContent = function(data) {

  for (i = 0; i < data.length; i++) {
    // Create an li for each job posting
    var jobLiEl = document.createElement("li");
    jobLiEl.style.marginBottom = "50px"
    jobsUlEl.appendChild(jobLiEl);

    // fill the li with content we want to display from the jobs arrays
    var jobTitleEl = document.createElement("h3");
    jobTitleEl.textContent = data[i].title;
    var jobDateEl = document.createElement("span");
    jobDateEl.textContent = moment(data[i].publication_date, moment.ISO_8601).format("ddd M/D/YY h:ma");


    // append content to the created li
    jobLiEl.appendChild(jobTitleEl);
    jobLiEl.appendChild(jobDateEl);

  }
  
  // description //

}

// CALLS //
getData();