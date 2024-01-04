
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
function checkAuth(data){
    if(auth){
            showProfileDetails(data)
    }
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

function showProfileDetails(data){
    const profilehtml = "<img src=\"res/GamerGait.png\" class=\"profile-icon\"><button id=\"profile-button\" onclick=\"viewProfile()\">" + data.username + "</button>"
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

   
function viewProfile(){
    window.location.href = "profile.html"
}

function register(){
    window.location.href = "register.html"
}
function login(){
    window.location.href = "login.html"
}