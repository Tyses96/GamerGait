// JavaScript code

function searchGames(){
    const gridContainer = document.querySelector("#grid-container");
	x = document.getElementById("searchbar");
	const response = fetch('http://localhost:8080/games/search=' + x.value.toString())
	var page_of_games = response.json();

    page_of_games.items.forEach((item) => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card");
        const itemName = document.createElement("p");
        itemName.textContent = item.name;

        const itemId = document.createElement("p");
        itemId.textContent = item.appid;

        itemCard.appendChild(itemName)
        itemCard.appendChild(itemId)
        gridContainer.appendChild(itemCard)
    });
}

async function getGameList(url, page_of_games){
    const response = await fetch(url);
    page_of_games = await response.json();
    }


