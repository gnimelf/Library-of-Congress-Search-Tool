// Selectors 
var searchInput = document.querySelector("#search-input");
var searchBtn = document.querySelector("#search-btn");
var searchType = document.querySelector("#salutation");

// Event listener
searchBtn.addEventListener("click", runSearch);

// Select Menu
$( "#salutation" ).selectmenu();

locBaseUrl = "https://www.loc.gov/";
jsonParam = "&fo=json";
var searchURL= '';

function runSearch(){
    searchURL=`${locBaseUrl}?q=${searchInput.value}${jsonParam}`;

    if (searchType.value !== 'Select a format...'){
        searchURL=`${locBaseUrl}${searchType.value}/?q=${searchInput.value}${jsonParam}`;
    }

    fetch(searchURL)
    .then((response) => {
        // TODO: function to handle status code that aren't 200


        return response.json();
    })
    .then((data) => {
        console.log(data);
        displayResults(data);
    })
}

function displayResults(data){
    var dataResults = data.results;
    for(var i=0; i<dataResults.length; i++){
        console.log(dataResults[i].title);
        console.log(dataResults[i].date.split("-")[0]);
    }
}