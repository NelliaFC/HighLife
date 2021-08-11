var url_string = window.location;
var url = new URL(url_string);
var keyword = url.searchParams.get("keyword");
var state = url.searchParams.get("state");
var jobsAr = []



// FETCH FUNTION // retrieves the data, converts the data from XML to JSON for object data handling and send that object to displayContent function
var getJoobleData = function() {
  var url = "https://jooble.org/api/";
  var key = "2877bf7c-37ce-47d1-9328-901ec0b873a4";
  var params = "{ keywords: '" + keyword + "', location: '" + state + "'}"
  // console.log(params);
  
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
      // displayContent(response.jobs.slice(0, 10));
      geocorderApi(response.jobs.slice(0, 20));
      // console.log(response);
    }
  }
  //Send request to the server
  http.send(params);
}



// DISPLAY RESULTS ON A MAP //  Here I will recieve data from the ZipCodeApi and use that data to form pins on the map. 
// USED DATA FROM JOOBLE API TO PRODUCE A LAT AND LONG //
function geocorderApi(data) {
   var urlParams = new URLSearchParams(window.location.search);
  var key = urlParams.get('key');
  
  var map = new maplibregl.Map({
      container: 'map',
      style: `https://api.maptiler.com/maps/streets/style.json?key=k6wTdV4beDzqePVBVpfz`,
      center: [-95.7129, 37.0902],
      zoom: 3.75
      
  }); 



    console.log(data)
  for (i = 0; i < data.length; i++) {
    var city = data[i].location;
    var title = data[i].title;
    var url = data[i].link;
    var company = data[i].company;
    var date = moment(data[i].updated, moment.ISO_8601).format("L");

    const popup = new maplibregl.Popup({ offset: 25 }).setHTML("<h3 style = 'margin: 0;'>" + title + "</h3>" + "<p style = 'margin: 0;'>" + company + "</p>" + "<p style = 'margin: 0;'>" + city + "</p>" + "<a href='" + url + "' target = 'blank'>" + data[i].link.substring(0, 19) + "</a>" + "<p style = 'margin: 0;'>" + date + "</p>");
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      var response = JSON.parse(this.responseText);
      var lat = response.results[0].geometry.location.lat;
      var lng = response.results[0].geometry.location.lng;
      // use coordinates from response to create a marker 
      var marker = new maplibregl.Marker()
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map);
    }
    xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyAho32bQy_Ftai2cUq_f6MS5kT423f0Gv4");
    xhttp.send();

  }
  
}





// CALLS //
getJoobleData();