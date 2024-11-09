const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');

fetchAuth();

fetchArticle();


function fetchAuth(){
    const promise = 
    fetch('https://gamergait.com:8443/auth/' + document.cookie);``

    promise.then((response) => {
        handleAuthResponse(response)
    })
}

function fetchArticle(){
    fetch('https://gamergait.com:8443/indie-insights/' + gameId)
    .then(response => response.json())
    .then(data => {createArticle(data, document.getElementById("article-holder"))})
}
