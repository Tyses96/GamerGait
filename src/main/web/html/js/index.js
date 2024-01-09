// JavaScript code
const steamGameDataUrl = "https://gamergait.com:8443/gameDetails/"
let pageNumber = 0;
let maxPages = 0;
const urlParams = new URLSearchParams(window.location.search);
let header = document.getElementById("header");
let searched = urlParams.get("search")
let auth = false;

getMonthlyTopPicks();
getTopRated();
fetchAuth();


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

    login = document.getElementById("login-button-sml")
    register = document.getElementById("register-button-sml")
    let listsml = document.getElementById("myDropdown")
    listsml.removeChild(login)
    listsml.removeChild(register)

    let profile = document.createElement("li")
    profile.classList.add("navbar-item")
    let profilea = document.createElement("a")
    profilea.href = "profile.html"
    profilea.innerHTML = "Profile";
    profile.appendChild(profilea)
    list.appendChild(profile)

    let logout = document.createElement("li")
    logout.classList.add("navbar-item")
    logouta = document.createElement("a")
    logouta.href = "#";
    logouta.setAttribute("onclick", "logout()")
    logouta.innerHTML= "Logout"
    logout.appendChild(logouta)
    list.appendChild(logout)

    let logoutsml = document.createElement("a")
    logoutsml.href = "#";
    logoutsml.setAttribute("onclick", "logout()")
    logoutsml.innerHTML= "Logout"

    let profilesml = document.createElement("a")
    profilesml.href = "profile.html"
    profilesml.innerHTML = "Profile";

    listsml.appendChild(profilesml)
    listsml.appendChild(logoutsml)

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
    window.location.href = "searchPage.html?search=" + x.value;
}

function getMonthlyTopPicks(){
    x = document.getElementById("searchbar");
    fetch('https://gamergait.com:8443/picksofthemonth')
    .then(response => response.json())
    .then(data => {createCards(data, "top-picks", document.getElementById("top-picks"), "Monthly top picks")})
}
function getTopRated(){
    x = document.getElementById("searchbar");
    fetch('https://gamergait.com:8443/toprated')
    .then(response => response.json())
    .then(data => {createCards(data, "top-rated", document.getElementById("top-rated"), "Top rated overall")})
}


 function createCards(page_of_games, cat, section, titleString){
    removeCards(section);
    let title = document.createElement("h2")
    title.classList.add("gamelist-title-"+cat)
    title.innerHTML = titleString
    section.appendChild(title)
    page_of_games.forEach(async(item) => {
    let score = item.overallRating;
    const itemCard = document.createElement("div");
    itemCard.classList.add("item-card-"+cat);
    const itemName = document.createElement("h4");
    const itemPicture = document.createElement("img");
    const itemId = document.createElement("p")
    const itemScore = document.createElement("p")
    itemPicture.classList.add("card-image-"+cat);
    itemName.classList.add("item-name-"+cat);
    itemId.classList.add("item-id")
    itemScore.classList.add("score-"+cat)
        if(score <1){
            score = "No scores yet"
            itemScore.classList.remove("score-"+cat)
            itemScore.backgroundColor = "#cdcdfa"
            itemScore.classList.add("no-score-"+cat)
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
        imgAndScoreHolder.classList.add("mainpage-img-score-holder-"+cat)

        const scoreHolder = document.createElement("div")

        scoreHolder.classList.add("score-holder-"+cat);

        const scoreTitle = document.createElement("p")

        scoreTitle.classList.add("score-title-"+cat)

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
        section.appendChild(itemCard)
        });
}

function removeCards(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function itemCardClicked(name, id){
    window.location.href = "gamePage.html?name=" + name + "&id=" + id
}

function goBack(){
    document.getElementById("searchbar").value = ""
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  