
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
  function searchGames(text){
    if(text == null){
        text = ""
    }
	x = document.getElementById("searchbar");
    window.location.href = "searchPage.html?search=" + x.value;
}