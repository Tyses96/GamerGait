const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('s');
let pageNumber = 0;
let maxPages = 0;
let authchecked = false;

fetchAuth();
loadSearch();


function fetchAuth(){
    const promise = 
    fetch('https://gamergait.com:8443/auth/' + document.cookie);``

    promise.then((response) => {
        handleAuthResponse(response)
    })
}

function loadSearch(){
        fetch('https://gamergait.com:8443/games/search=' + query + "?page=" + pageNumber)
        .then(response => response.json())
        .then(data => {createCardsPageable(data, document.getElementById("search-results"), true)})
}