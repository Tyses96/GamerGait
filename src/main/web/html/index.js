// JavaScript code
const gridContainer = document.querySelector("#grid-container");
const steamGameDataUrl = "http://localhost:8080/gameDetails/"


function searchGames(){
	x = document.getElementById("searchbar");
        fetch('http://localhost:8080/games/search=' + x.value.toString())
        .then(response => response.json())
        .then(data => createCards(data))
}

 function createCards(page_of_games){
    removeCards(gridContainer);
    page_of_games.content.forEach(async(item) => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card");
        itemCard.classList.add("centre");
        const itemName = document.createElement("h1");
        const itemPicture = document.createElement("img");

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

function removeCards(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

