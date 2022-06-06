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
// backBtnEl.click(reset);

// Select Menu
$( "#salutation" ).selectmenu();

locBaseUrl = "https://www.loc.gov/";
jsonParam = "&fo=json";
var searchURL= '';

// Get search results
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
    })
}

// Display search results to page
function displayResults(data){

    var dataResults = data.results;
    searchCardEl.removeClass("search-only");
    searchResultsEl.removeClass("hide");
    searchBtnEl.removeClass("hide");
    backBtnEl.removeClass("hide");
    // formEl.trigger("reset");

    searchResultsEl.append(`<h3>Showing results for ${searchInputEl.val()}</h3>`);

    for(var i=0; i<dataResults.length; i++){

        console.log[i];
        var card = createCard(dataResults[i]);
        
        card.appendTo(searchResultsEl);
    }
}

// Create a card for each result
function createCard(cardData){

    var titleEl = $("<h2>");
    titleEl.addClass("card-title");
    var resultCardEl = $("<section>");
    var dateEl = $("<p>");
    var subjectEl = $("<p>");
    var descriptionEl = $("<p>");
    
    resultCardEl.addClass("card-body");
    articleDate = cardData.date;
    articleDescription = cardData.description;
    articleSubject = cardData.subject

    // Check the format of the search
    if (searchTypeEl.value === "newspapers"){
        titleEl.text(cardData.partof_title);
    } else if (typeof(cardData.title) === Array) {
        titleEl.text(cardData.title.toString());
    } else {
        titleEl.text(cardData.title);
    }

    // Get Date
    if (articleDate && articleDate.length > 1) {
        dateEl.text(`Date: ${articleDate.split("-")[0]}`);
    } else if (articleDate && articleDate.length === 1) {
        dateEl.text(`Date: ${articleDate}`);
    } else {
        dateEl.text("N/A");
    }
    
    // Get subject
    if (articleSubject && typeof(articleSubject) === Array){
        subjectEl.text(`Subjects: ${articleSubject.toString()}`);
    } else {
        subjectEl.text = "N/A";
    }
    
    // Get Description
    if (articleDescription) {
        descriptionEl.text(`Description: ${articleDescription[0]}`);
    } else {
        descriptionEl.text = "N/A";
    }
    
    // Create button
    var buttonEl = $("<button>");
    buttonEl.text("Read more");
    buttonEl.click(()=>{
        window.location = cardData.url;
    });

    // Create Card
    titleEl.appendTo(resultCardEl);
    dateEl.appendTo(resultCardEl);
    subjectEl.appendTo(resultCardEl);
    descriptionEl.appendTo(resultCardEl);
    buttonEl.appendTo(resultCardEl);

    return(resultCardEl);

}
