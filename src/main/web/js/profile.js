let pagetitle = document.getElementById("main-title")

fetchAuth();
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
    
  
    const profilehtml = "<img src=\"res/GamerGait.png\" class=\"profile-icon\" onclick=\"viewProfile()\"><button id=\"profile-button\">" + data.username + "</button>"
    const logoutHtml = "<button class=\"logout-button\" onclick=\"logout()\">Logout</button>"
  
    const authbuttons = document.createElement("div")
  
    const hotbar = document.getElementById("hotbar")

    const profilebutton = document.createElement("div")
    profilebutton.classList.add("profile-button-holder")
    profilebutton.innerHTML = profilehtml;
  
    const logoutbutton = document.createElement("div")
    logoutbutton.innerHTML = logoutHtml;
  
    authbuttons.classList.add("authbuttons")
    let hdrComp = document.getElementById("header")
    let loginReg = document.getElementById("button-holder")
    loginReg.innerHTML = "";
  
    authbuttons.append(profilebutton)
    authbuttons.append(logoutbutton)
    hotbar.prepend(authbuttons)
  
    hdrComp.prepend(hotbar)

    pusername = document.getElementById("profile-username-holder")
    pusername.innerHTML = username;

    pemail = document.getElementById("profile-email-holder")
    pemail.innerHTML = data.email;
    
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