// JavaScript code
const gridContainer = document.querySelector("#grid-container");
const steamGameDataUrl = "https://gamergait.com:8443/gameDetails/"
let pageNumber = 0;
let maxPages = 0;
const urlParams = new URLSearchParams(window.location.search);
let header = document.getElementById("header");
let searched = urlParams.get("search")
let auth = false;



searchGames(searched);
fetchAuth();
styleBox(gridContainer)
function fetchAuth(){

    const promise = 
    fetch('https://gamergait.com:8443/auth/' + document.cookie);``

    promise.then((response) => {
        handleAuthResponse(response)
    })
}

function checkAuth(data){
    if(auth){
            showProfileDetails(data)
    }
}

function showProfileDetails(data){
    let login = document.getElementById("login-button")
    let register = document.getElementById("register-button")
    let list = document.getElementById("navbar")
    list.removeChild(login)
    list.removeChild(register)

    let profile = document.createElement("li")
    profile.classList.add("navbar-item")
    let profilea = document.createElement("a")
    profilea.href = "profile.html"
    profilea.innerHTML = "Profile";
    profile.appendChild(profilea)

    let logout = document.createElement("li")
    logout.classList.add("navbar-item")
    logouta = document.createElement("a")
    logouta.href = "#";
    logouta.setAttribute("onclick", "logout()")
    logouta.innerHTML= "Logout"
    logout.appendChild(logouta)


    list.appendChild(profile)
    list.appendChild(logout)
}

function handleAuthResponse(response){
    if(response.status === 200){
        auth = true;
        response.json().then((data) => {
        checkAuth(data)
        });
    }
    else auth = false;
}

function searchGames(text){
    if(text == null){
        text = ""
    }
	x = document.getElementById("searchbar");
        fetch('https://gamergait.com:8443/games/search=' + x.value.toString() + text +  "?page=" + pageNumber)
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
        let score = item.overallRating;
        const itemCard = document.createElement("div");
        itemCard.classList.add("item-card-top-picks");
        const itemName = document.createElement("h4");
        const itemPicture = document.createElement("img");
        const itemId = document.createElement("p")
        const itemScore = document.createElement("p")
        maxPages = page_of_games.totalPages;
        itemPicture.classList.add("card-image-top-picks");
        itemName.classList.add("item-name-top-picks");
        itemId.classList.add("item-id")
        itemScore.classList.add("score-top-picks")
        if(score <1){
            score = "No scores yet"
            itemScore.classList.remove("score-top-picks")
            itemScore.backgroundColor = "#cdcdfa"
            itemScore.classList.add("no-score-top-picks")
        }
        else if(score < 25){
            itemScore.style.backgroundColor = "#ee4f44";
          }
          else if(score >25 && score <65){
            itemScore.style.backgroundColor = "#dfcd81";
          }
          else {
            itemScore.style.backgroundColor = "#1EBB39";
          }
          itemScore.style.marginTop = "0";
          itemScore.style.marginBottom = "0";
        if(score < 10){
            itemScore.style.width = "2.5rem";
        }



        fetch(steamGameDataUrl + item.appid)
        .then((response) => {
            return response.json()
        }).then(
            (value) => {
                itemPicture.src = value.data.capsule_image;
            }
        )
        const imgAndScoreHolder = document.createElement("div")
        imgAndScoreHolder.classList.add("mainpage-img-score-holder-top-picks")

        const scoreHolder = document.createElement("div")

        scoreHolder.classList.add("score-holder-top-picks");

        const scoreTitle = document.createElement("p")

        scoreTitle.classList.add("score-title-top-picks")

        scoreTitle.textContent = "Overall Rating: "

        scoreHolder.appendChild(scoreTitle)
        scoreHolder.appendChild(itemScore)

        imgAndScoreHolder.appendChild(itemPicture)
        imgAndScoreHolder.appendChild(scoreHolder)
        itemPicture.alt = item.name
        itemName.textContent = item.name
        itemId.textContent = item.appid
        itemScore.textContent = score;
        itemCard.appendChild(itemName)
        itemCard.appendChild(imgAndScoreHolder)
        itemCard.appendChild(itemId)
        itemCard.addEventListener('click', function(){itemCardClicked(item.name, item.appid)});
        itemCard.style.backgroundColor="#9999cc"
        itemCard.style.marginBottom ="1rem"
        itemCard.style.borderRadius = "5px"
        itemCard.style.border = "solid 4px #27274e"
        itemCard.style.boxShadow= "0 0 30px #27274e8e inset"
        gridContainer.appendChild(itemCard)
    });
}else{
    const itemCard = document.createElement("div")
    itemCard.classList.add("item-card-none-top-picks")
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


function goBack(){
    document.getElementById("searchbar").value = ""
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setButtonsToPages(pageNumber){
    let buttons = document.getElementById("buttons");
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

async function logout(){
    let token = getCookie("token")
    await fetch('https://gamergait.com:8443/logout', {
        method: "POST",
		headers: {
			"Content-Type": "application/json",

		  },
        body: JSON.stringify(
            {
                "token":token
            }
        )
    })
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    location.reload();
}

function getCookie(name) { 
    var re = new RegExp(name + "=([^;]+)"); 
    var value = re.exec(document.cookie); 
    return (value != null) ? unescape(value[1]) : null; 
   }


function selectRandomGame(){
    fetch('https://gamergait.com:8443/random-game')
    .then(response => response.json())
    .then(data => {
        window.location.href = "gamePage.html?name=" + data.name + "&id=" + data.appid
    })
}
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  function styleBox(box){
    let x = Math.floor((Math.random()*13) +1);
    urlToImage = "url('css/res/spbg/spbg" + x + ".png')";
    box.style.backgroundImage =urlToImage;
    box.style.backgroundColor = "rgba(255,255,255,0.2);";
    box.style.backgroundBlendMode = "lighten";
    box.style.fontFamilt = "'Quantico'";
    box.style.border = "solid 2px #27274e";
    box.style.borderRadius = "10px"
    box.marginBottom = "1rem";
  }