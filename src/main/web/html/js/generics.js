const steamGameDataUrl = "https://gamergait.com:8443/gameDetails/"
M.AutoInit();
let authChecked = 0;
let userId;
let gUsername;
let gEmail;
let gGait;
let gReviews;
let gStanding;
let gVerified;

function fetchAuth(){
    const promise = 
    fetch('https://gamergait.com:8443/auth/' + document.cookie);``

    promise.then((response) => {
        handleAuthResponse(response)
    })
}




function itemCardClicked(name, id){
    window.location.href = "gamePage.html?name=" + name + "&id=" + id
}

function showProfileDetailsNavBar(){
    setNavbarItems("nav-mobile", auth)
    setNavbarItems("mobile", auth)
}

function setNavbarItems(idList, authed){
    if(authChecked < 2){
    let bar = document.getElementById(idList)
    if(authed){
        let lip = document.createElement("li")
        lip.id = "profile-button"
        let profileButton = document.createElement("a")
        profileButton.href="profile.html"
        profileButton.innerHTML="Profile"
        lip.appendChild(profileButton)
        bar.appendChild(lip)
    
        let lil = document.createElement("li")
        lil.id = "logout-button"
        let logoutButton = document.createElement("a")
        logoutButton.addEventListener('click', function(){logout()})
        logoutButton.innerHTML = "Logout"
        logoutButton.href="#"
        lil.appendChild(logoutButton)
        bar.appendChild(lil)
    }
    else{
        let lis = document.createElement("li")
        let signupButton = document.createElement("a")
        signupButton.href="register.html"
        signupButton.innerHTML="Sign Up"
        lis.appendChild(signupButton)
        bar.appendChild(lis)
    
        let lil = document.createElement("li")
        let loginButton = document.createElement("a")
        loginButton.innerHTML = "Login"
        loginButton.href="login.html"
        lil.appendChild(loginButton)
        bar.appendChild(lil)

    }
    let lih = document.createElement("li")
    let home = document.createElement("a")
    home.href="index.html"
    home.innerHTML="Home"
    lih.appendChild(home)
    bar.appendChild(lih)
        authChecked +=1;
    }
}

function handleAuthResponse(response){
    if(response.status === 200){
        auth = true;
        response.json().then((data) => {
            setUserParams(data)
        });
    }
    else auth = false;
    showProfileDetailsNavBar(auth)
}

function setUserParams(data){
    userId = data.id;
    username = data.username;
    gVerified = data.verified;
}

function searchGames(){
    let text = document.getElementById("search").value
    window.location.href = "search.html?s=" + text;
}

function selectRandomGame(){
    fetch('https://gamergait.com:8443/random-game')
    .then(response => response.json())
    .then(data => {
        window.location.href = "gamePage.html?name=" + data.name + "&id=" + data.appid
    })
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
    window.location.href = "index.html"
}


function getCookie(name) { 
    var re = new RegExp(name + "=([^;]+)"); 
    var value = re.exec(document.cookie); 
    return (value != null) ? unescape(value[1]) : null; 
   }

   
function removeCards(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function createCards(page_of_games, section){
    removeCards(section);
    page_of_games.forEach(async(item) => {
    let col = document.createElement("div")
    col.classList.add("col")
    col.classList.add("s12")
    col.classList.add("m6")
    col.classList.add("l3")

    let card = document.createElement("div")
    card.classList.add("card")
    col.appendChild(card)

    let cardImageHolder = document.createElement("div")
    cardImageHolder.classList.add("card-image")
    card.appendChild(cardImageHolder)

    let cardimage = document.createElement("img")
    fetch(steamGameDataUrl + item.appid)
    .then((response) => {
        return response.json()
    }).then(
        (value) => {
            cardimage.src = value.data.header_image;
        }
    )
    cardimage.classList.add("responsive-img")
    let cardTitle = document.createElement("h6")
    cardTitle.classList.add("center")
    cardTitle.classList.add("deep-purple")
    cardTitle.classList.add("white-text")
    cardTitle.innerHTML = item.name;
    cardImageHolder.appendChild(cardimage)
    cardImageHolder.appendChild(cardTitle)

    let cardContent = document.createElement("div")
    cardContent.classList.add("card-content")


    card.appendChild(cardContent)
    let score = item.overallRating
    let colour = generateColourForScore(item.overallRating)
    let accent = generateAccent(item.overallRating)


    let rating = document.createElement("p")
    rating.classList.add("center-align")
    rating.innerHTML = "<p>Overall Rating: <p>" + "<h6 class=\"" + colour + " " + accent +  " score circle\">" + score + "<h6>"
    cardContent.appendChild(rating)

    let divider = document.createElement("div")
    divider.classList.add("divider")

    col.addEventListener('click', function(){itemCardClicked(item.name, item.appid)});
    section.appendChild(col)
    })
}
function createCardsPageable(page_of_games, section, remove){
    if(remove){
        removeCards(section);
    }

    let counter = 0
    page_of_games.content.forEach(async(item) => {
    counter += 1;
    let col = document.createElement("div")
    col.classList.add("col")
    col.classList.add("s12")
    col.classList.add("m6")
    col.classList.add("l3")

    let card = document.createElement("div")
    card.classList.add("card")
    col.appendChild(card)

    let cardImageHolder = document.createElement("div")
    cardImageHolder.classList.add("card-image")
    card.appendChild(cardImageHolder)

    let cardimage = document.createElement("img")
    fetch(steamGameDataUrl + item.appid)
    .then((response) => {
        return response.json()
    }).then(
        (value) => {
            cardimage.src = value.data.header_image;
        }
    )
    cardimage.classList.add("responsive-img")
    let cardTitle = document.createElement("h6")
    cardTitle.classList.add("center")
    cardTitle.classList.add("deep-purple")
    cardTitle.classList.add("white-text")
    cardTitle.innerHTML = item.name;
    cardImageHolder.appendChild(cardimage)
    cardImageHolder.appendChild(cardTitle)

    let cardContent = document.createElement("div")
    cardContent.classList.add("card-content")


    card.appendChild(cardContent)
    let score = item.overallRating
    let colour = generateColourForScore(item.overallRating)
    let accent = generateAccent(score)


    let rating = document.createElement("p")
    rating.classList.add("center-align")
    rating.innerHTML = "<p>Overall Rating: <p>" + "<h6 class=\"" + colour + " " + accent + " score circle\">" + score + "<h6>"
    cardContent.appendChild(rating)

    let divider = document.createElement("div")
    divider.classList.add("divider")

    col.addEventListener('click', function(){itemCardClicked(item.name, item.appid)});

    if(counter == 4){
        let rowDiv = document.createElement("div")
        rowDiv.classList.add("row")
        rowDiv.appendChild(col)
        section.appendChild(rowDiv)
        counter = 0;
    }
    else{
        section.appendChild(col)
    }

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


function generateColourForScore(score){
    colour = "green"
    if(score <1){
        colour= "deep-purple"
    }
    else if(score < 25){
        colour = "red";
      }
      else if(score >25 && score <55){
        colour = "amber";
      }
      return colour;
}
function generateAccent(score){
    accent = "lighten-2"
    if(score == 0){
        accent = "white-text"
    }
    if((score >= 1 && score < 10 ) || (score >= 25 && score < 35) || (score >= 90 && score < 101)){
        accent = "no-accent"
    }
    else if((score >= 10 && score < 15) || (score >= 35 && score < 40) || (score >= 80 && score < 90)){
        accent = "lighten-1"
    }
    else if((score >= 15 && score < 20) || (score >= 40 && score < 48) || (score >= 70 && score < 80)){
        accent = "lighten-2"
    }
    else if((score >= 20 && score < 25) || (score >= 48 && score < 55) || (score >= 55 && score < 70)){
        accent = "lighten-3"
    }
    return accent;
}


function createArticleCards(data, box){
    if(data.length < 1){
        box.innerHTML = "<h5 class=\"center\">No results</h5>"
    }
    data.forEach(async(item) => {
        let section = document.createElement("div")
        section.classList.add("section")
        box.appendChild(section)

        let card = document.createElement("div")
        card.classList.add("card")
        card.classList.add("hoverable")
        section.appendChild(card)
    
        let cardImageHolder = document.createElement("div")
        cardImageHolder.classList.add("card-image")
        card.appendChild(cardImageHolder)
    
        let cardimage = document.createElement("img")
        cardimage.src = item.listImgSrc;
        cardimage.classList.add("responsive-img")
        let cardTitle = document.createElement("h5")
        cardTitle.classList.add("center-align")

        cardTitle.innerHTML = item.title;
        cardImageHolder.appendChild(cardimage)
        cardImageHolder.appendChild(cardTitle)
    
        let cardContent = document.createElement("div")
        cardContent.classList.add("card-content")
        card.appendChild(cardContent)

        let body = document.createElement("p")
        body.classList.add("truncate")
        body.classList.add("grey-text")
        body.classList.add("text-darken-1")
        body.innerHTML = item.body.substring(0,125) + "...";
        cardContent.appendChild(body)
    
        section.addEventListener('click', function(){articleItemCardClicked(item.id)});
    })
}

function createArticle(data, section){

    setPageTitle(data.title);
    let divider = document.createElement("div")
    divider.classList.add("divider")

    let divider2 = document.createElement("div")
    divider2.classList.add("divider")

    let dateHolder = document.getElementById("date");
    dateHolder.innerHTML = formatDateTimeToDate(data.date)

    let title = document.createElement("h2")
    title.classList.add("center")
    title.innerHTML = data.title + "<br>"
    title.appendChild(divider)
    section.appendChild(title)

    let imgDiv = document.createElement("div")
    imgDiv.classList.add("center")
    imgDiv.appendChild(divider2)
    imgDiv.innerHTML = "<br>"
    section.appendChild(imgDiv)

    let mainImage = document.createElement("img")
    mainImage.src = data.mainImgSrc;
    mainImage.classList.add("responsive-img")
    imgDiv.appendChild(mainImage)



    let body = document.createElement("div")
    body.classList.add("flow-text")
    body.innerHTML = data.body
    section.appendChild(body)
}


//2024-01-17 14:24:51.239 +0000

function formatDateTimeToDate(date){
    let year = date.substring(0,4)
    let month = date.substring(5,7)
    let day = date.substring(8,10)

    let actualDate = day + "/" + month + "/" + year

    return actualDate
}

function setPageTitle(title){
    let pageTitle = document.getElementById("page-title")
    pageTitle.innerHTML = title
}