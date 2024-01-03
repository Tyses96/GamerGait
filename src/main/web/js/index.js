// JavaScript code
const gridContainer = document.querySelector("#grid-container");
const steamGameDataUrl = "https://gamergait.com:8443/gameDetails/"
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

    const promise = 
    fetch('https://gamergait.com:8443/auth/' + document.cookie);

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
    const profilehtml = "<img src=\"res/GamerGait.png\" class=\"profile-icon\"><button id=\"profile-button\">" + data.username + "</button>"
    const logoutHtml = "<button class=\"logout-button\" onclick=\"logout()\">Logout</button>"
    const changePasswordHtml = "<button class=\"logout-button\" onclick=\"resetPassword()\">Reset Password</button>"
    const authbuttons = document.createElement("div")

    const profilebutton = document.createElement("div")
    profilebutton.classList.add("profile-button-holder")
    profilebutton.innerHTML = profilehtml;

    const logoutbutton = document.createElement("div")
    logoutbutton.innerHTML = logoutHtml;

    const changePass = document.createElement("div")
    changePass.innerHTML = changePasswordHtml;

    authbuttons.classList.add("authbuttons")
    let hdrComp = document.getElementById("header")
    let loginReg = document.getElementById("button-holder")
    loginReg.innerHTML = "";

    authbuttons.append(profilebutton)
    authbuttons.append(logoutbutton)
    authbuttons.append(changePass)

    hdrComp.prepend(authbuttons)
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
        itemCard.classList.add("item-card");
        itemCard.classList.add("centre");
        const itemName = document.createElement("h4");
        const itemPicture = document.createElement("img");
        const itemId = document.createElement("p")
        const itemScore = document.createElement("p")
        maxPages = page_of_games.totalPages;
        itemPicture.classList.add("card-image");
        itemName.classList.add("item-name");
        itemId.classList.add("item-id")
        itemScore.classList.add("score")
        if(score <1){
            score = "No scores yet"
            itemScore.classList.remove("score")
            itemScore.backgroundColor = "#cdcdfa"
            itemScore.classList.add("no-score")
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
        imgAndScoreHolder.classList.add("mainpage-img-score-holder")

        const scoreHolder = document.createElement("div")

        scoreHolder.classList.add("score-holder");

        const scoreTitle = document.createElement("p")

        scoreTitle.classList.add("score-title")

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

   function resetPassword(){
    window.location.href = "password-reset.html"
   }
