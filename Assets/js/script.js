// Selectors 
var searchInputEl = $("#search-input");
var searchBtnEl = $("#search-btn");
var backBtnEl = $("#back-btn");
var searchTypeEl = $("#salutation");
var searchCardEl = $("#search-card");
var searchResultsEl = $("#search-results");
var formEl = $("form");

// Event listener
searchBtnEl.click(runSearch);

// Select Menu
$( "#salutation" ).selectmenu();

locBaseUrl = "https://www.loc.gov/";
jsonParam = "&fo=json";
var searchURL= '';

function runSearch(){
    searchResultsEl.empty();
    
    searchURL=`${locBaseUrl}?q=${searchInputEl.value}${jsonParam}`;

    if (searchTypeEl.value !== 'Select a format...'){
        searchURL=`${locBaseUrl}${searchTypeEl.val()}/?q=${searchInputEl.val()}${jsonParam}`;
    }

    fetch(searchURL)
    .then((response) => {   

        return response.json();
    })
    .then((data) => {
        console.log(data);
        displayResults(data);
    }).then()
}

function displayResults(data){
    

    var dataResults = data.results;

    searchCardEl.removeClass("search-only");
    searchResultsEl.removeClass("hide");
    searchBtnEl.removeClass("hide");
    formEl.trigger("reset");
    
    for(var i=0; i<dataResults.length; i++){



        console.log(dataResults[i].title);
        console.log(dataResults[i].date.split("-")[0]);
    }
}

