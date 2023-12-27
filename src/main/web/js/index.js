// JavaScript code
const gridContainer = document.querySelector("#grid-container");
const steamGameDataUrl = "http://localhost:8080/gameDetails/"
let pageNumber = 0;
let maxPages = 0;
const urlParams = new URLSearchParams(window.location.search);
window.onscroll = function() {scrollStick()};
let header = document.getElementById("header");
let sticky = header.offsetTop;
let searched = urlParams.get("search")
let auth = false;


searchGames(searched);

fetchAuth();

function fetchAuth(){
    fetch('http://localhost:8080/auth/' + document.cookie)
        .then(response => response.json())
        .then(data => {checkAuth(data)})
}

function checkAuth(data){
    console.log(data)
}
function searchGames(text){
    if(text == null){
        text = ""
    }
	x = document.getElementById("searchbar");
        fetch('http://localhost:8080/games/search=' + x.value.toString() + text +  "?page=" + pageNumber)
        .then(response => response.json())
        .then(data => {createCards(data)})
}



 function createCards(page_of_games){
    removeCards(gridContainer);
    if(page_of_games.totalPages > 0){
        if(page_of_games.totalPages < 2 ){
            setButtonsToBack();
        }
        else{
            setButtonsToPages(pageNumber);
        }
        page_of_games.content.forEach(async(item) => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card");
        itemCard.classList.add("centre");
        const itemName = document.createElement("h4");
        const itemPicture = document.createElement("img");
        const itemId = document.createElement("p")
        maxPages = page_of_games.totalPages;
        itemPicture.classList.add("card-image");
        itemName.classList.add("item-name");
        itemId.classList.add("item-id")
        fetch(steamGameDataUrl + item.appid)
        .then((response) => {
            return response.json()
        }).then(
            (value) => {
                itemPicture.src = value.data.capsule_image;
            }
        )
        itemPicture.alt = item.name
        itemName.textContent = item.name
        itemId.textContent = item.appid
        itemCard.appendChild(itemName)
        itemCard.appendChild(itemPicture)
        itemCard.appendChild(itemId)
        itemCard.addEventListener('click', function(){itemCardClicked(item.name, item.appid)});
        gridContainer.appendChild(itemCard)
    });
}else{
    const itemCard = document.createElement("div")
    itemCard.classList.add("item-card-none")
    itemCard.classList.add("centre")
    const itemName = document.createElement("h4")
    itemName.textContent = "No results found!"
    itemCard.appendChild(itemName)
    gridContainer.appendChild(itemCard)
    setButtonsToBack();
}
}

function incrementPageNumber(){
    enableButton("prev")
    enableButton("next")
    if(pageNumber == maxPages-1){
        pageNumber = maxPages-1;
    }else{
         pageNumber += 1;
         window.scrollTo({ top: 0, behavior: 'smooth' });
         searchGames();
    }

}

function decrementPageNumber(){
    enableButton("prev")
    enableButton("next")
    if(pageNumber <= 0){
        pageNumber = 0;
    }
    else {
        pageNumber -= 1;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        searchGames();
    }
}

function removeCards(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function resetPageNumber(){
    pageNumber = 0;
}

function itemCardClicked(name, id){
    window.location.href = "gamePage.html?name=" + name + "&id=" + id
}

function scrollStick() {
    if (window.scrollY > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }

function goBack(){
    document.getElementById("searchbar").value = ""
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function register(){
    window.location.href = "register.html"
}
function login(){
    window.location.href = "login.html"
}

function setButtonsToPages(pageNumber){
    let buttons = document.querySelector(".buttons");
    buttons.innerHTML = "<button id=\"prev\" class= \"header-button\" onclick=\"decrementPageNumber()\">Prev</button><button id=\"next\" class= \"header-button\" onclick=\"incrementPageNumber()\">Next</button>"
    if(pageNumber == 0){
        disableButton("prev")
    }
    if(pageNumber == maxPages -2){
        disableButton("next")
    }
}

function setButtonsToBack(){
    let buttons = document.querySelector(".buttons");
    buttons.innerHTML = "<button id=\"next\" class= \"header-button\" onclick=\"goBack(); searchGames();\">Back</button>";
}
function disableButton(buttonId){
    document.getElementById(buttonId).disabled = true;
}

function enableButton(buttonId){
    document.getElementById(buttonId).disabled = false;
}
