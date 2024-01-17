fetchAuth();
fetchArticles();

function fetchAuth(){
    const promise =
    fetch('https://gamergait.com:8443/auth/' + document.cookie);``

    promise.then((response) => {
        handleAuthResponse(response)
    })
}

function fetchArticles(){
    fetch('https://gamergait.com:8443/news')
    .then(response => response.json())
    .then(data => {createArticleCards(data, document.getElementById("news-holder"))})
}

function articleItemCardClicked(id){
    window.location.href = "newspage.html?id=" + id;
}