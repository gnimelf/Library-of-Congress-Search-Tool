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

        var card = createCard(dataResults[i]);

        card.appendTo(searchResultsEl);

        // console.log(dataResults[i].title);
        // console.log(dataResults[i].date.split("-")[0]);
    }
}

function createCard(cardData){

    // Create Card
    var resultCardEl = $("<section>");
    resultCardEl.addClass("card-body");

    // Create title
    var titleEl = $("<h2>");
    titleEl.addClass("card-title");
    titleEl.text(cardData.partof_title);

    var dateEl = $("<p>");
    dateEl.text(`Date: ${cardData.date.split("-")[0]}`);

    var subjectEl = $("<p>");
    subjectEl.text(`Subjects: ${cardData.subject.toString()}`);

    var descriptionEl = $("<p>");
    descriptionEl.text(`Description: ${cardData.description[0]}`);

    var buttonEl = $("<button>");
    buttonEl.text("Read more");
    buttonEl.click(()=>{
        window.location = cardData.url;
    })

    titleEl.appendTo(resultCardEl);
    dateEl.appendTo(resultCardEl);
    subjectEl.appendTo(resultCardEl);
    descriptionEl.appendTo(resultCardEl);
    buttonEl.appendTo(resultCardEl);

    return(resultCardEl);

}