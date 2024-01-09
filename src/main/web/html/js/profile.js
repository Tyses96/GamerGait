let pagetitle = document.getElementById("main-title")

fetchAuth();
setPageBackground(document.getElementById("profile-page-holder"))
function fetchAuth(){

    const promise = 
    fetch('https://gamergait.com:8443/auth/' + document.cookie);

    promise.then((response) => {
        handleAuthResponse(response)
    })
}

function handleAuthResponse(response){
    if(response.status === 200){
        auth = true;
        response.json().then((data) => {
        showProfileDetails(data)
        });
    }
    else{
        auth = false;
        showLogin();
    } 

}

function showProfileDetails(data){
    userId = data.id;
    username = data.username;
    pagetitle.innerHTML = username + "'s profile"
    
  
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

    pusername = document.getElementById("profile-username-holder")
    pusername.innerHTML = "Username: <br>" + username;

    pemail = document.getElementById("profile-email-holder")
    pemail.innerHTML = "Email: <br>" + data.email;
    
    pemail = document.getElementById("profile-gaits")
    pemail.innerHTML = "Gaits: " + data.gaits;

    previews = document.getElementById("total-profile-reviews")
    previews.innerHTML = "Reviews: " + data.totalReviews;

    pstanding = document.getElementById("profile-standing")
    pstanding.innerHTML = "Standing: " + data.standing;
}

function showLogin(){
    let page = document.getElementById("profile-page-holder")
    page.innerHTML = "<div class=\"reviewbox\" id=\"initial-login\"><a href=\"login.html\" class=\"login-review-text\">Login to view your profile</a></div>"
}

function register(){
    window.location.href = "register.html"
}

function resetPassword(){
    window.location.href = "password-reset.html"
}
function login(){
    window.location.href = "login.html"
}
function viewProfile(){
    window.location.href = "profile.html"
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
function privacyPolicy(){
    window.location.href = "privacy.html"
}
function about(){
    window.location.href = "about.html"
}

function selectRandomGame(){
    fetch('https://gamergait.com:8443/random-game')
    .then(response => response.json())
    .then(data => {
        window.location.href = "gamePage.html?name=" + data.name + "&id=" + data.appid
    })
}

function setPageBackground(box){
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
  function searchGames(text){
    if(text == null){
        text = ""
    }
	x = document.getElementById("searchbar");
    window.location.href = "searchPage.html?search=" + x.value;
}
