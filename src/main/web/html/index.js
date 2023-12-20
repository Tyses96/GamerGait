// JavaScript code
const gridContainer = document.querySelector("#grid-container");
const steamGameDataUrl = "http://localhost:8080/gameDetails/"
let pageNumber = 0;
let maxPages = 0;

window.onscroll = function() {scrollStick()};
let header = document.getElementById("header");
let sticky = header.offsetTop;

searchGames();

function searchGames(){
	x = document.getElementById("searchbar");
        fetch('http://localhost:8080/games/search=' + x.value.toString() + "?page=" + pageNumber)
        .then(response => response.json())
        .then(data => {createCards(data)})
}



 function createCards(page_of_games){
    removeCards(gridContainer);

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

}

function incrementPageNumber(){
    if(pageNumber == maxPages-1){
        pageNumber = maxPages-1;
    }
    else{
         pageNumber += 1;
         window.scrollTo({ top: 0, behavior: 'smooth' });
         searchGames();
    }
}

function decrementPageNumber(){
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

function register(){
    window.location.href = "register.html"
}
