// JavaScript code
const gridContainer = document.querySelector("#grid-container");

function searchGames(){
	x = document.getElementById("searchbar");
        fetch('http://localhost:8080/games/search=' + x.value.toString())
        .then(response => response.json())
        .then(data => createCards(data))
}

function createCards(page_of_games){
    removeCards(gridContainer);
    page_of_games.content.forEach((item) => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card");
        const itemName = document.createElement("div");
        itemName.textContent = item.name;
        itemCard.appendChild(itemName)
        gridContainer.appendChild(itemCard)
    });
}

function removeCards(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

