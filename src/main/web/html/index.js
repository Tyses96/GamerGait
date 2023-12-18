// JavaScript code
const gridContainer = document.querySelector("#grid-container");
const steamGameDataUrl = "http://localhost:8080/gameDetails/"
let pageNumber = 0;
let maxPages = 0;

function searchGames(){
	x = document.getElementById("searchbar");
    let pageDetails;
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

        maxPages = page_of_games.totalPages;

        itemPicture.classList.add("card-image");

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
        itemCard.appendChild(itemName)
        itemCard.appendChild(itemPicture)
        gridContainer.appendChild(itemCard)
    });
}

function incrementPageNumber(){
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if(pageNumber >= maxPages){
        pageNumber = maxPages;
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

