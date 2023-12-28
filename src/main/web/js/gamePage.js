window.onscroll = function() {scrollStick()};
let header = document.getElementById("header");
let sticky = header.offsetTop;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const gameName = urlParams.get('name')

fetchAuth()
fetch('http://localhost:8080/gameDetails/' + id)
.then(response => response.json())
.then(data => {createGameDetailsSection(data)})

function fetchAuth(){

  const promise = 
  fetch('http://localhost:8080/auth/' + document.cookie);

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
  const profilehtml = "<img src=\"res/gamerGait.png\" class=\"profile-icon\"><button id=\"profile-button\">" + data.username + "</button>"
  const logoutHtml = "<button class=\"logout-button\" onclick=\"logout()\">Logout</button>"

  const authbuttons = document.createElement("div")

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

function goHome(){
  x = document.getElementById("searchbar");
  window.location.href = "index.html?search=" + x.value.toString();
}

function createGameDetailsSection(gameDetails){
    // Image created from API call and displayed
    let headerImageUrl = gameDetails.data.header_image;
    let mainPageImageDiv = document.getElementById("imgdiv");
    let mainPageImage = document.createElement("img");
    mainPageImage.classList.add("main-image");
    mainPageImage.src = headerImageUrl;
    mainPageImageDiv.appendChild(mainPageImage);

    //Title
    let mainPageTitleDiv = document.getElementById("gametitle")
    let mainPageTitleTextArea = document.createElement("h4")
    mainPageTitleTextArea.textContent = gameName;
    mainPageTitleDiv.appendChild(mainPageTitleTextArea);

    //Description
    let mainPageDescDiv = document.getElementById("description")
    let mainPageDescTextArea = document.createElement("p")
    mainPageDescTextArea.classList.add("description-class")
    let text = gameDetails.data.short_description.replace(/&quot;/g, '"');
    mainPageDescTextArea.textContent = text;
    mainPageDescDiv.appendChild(mainPageDescTextArea);
}


function scrollStick() {
    if (window.scrollY > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
  function register(){
    window.location.href = "register.html"
}
function login(){
  window.location.href = "login.html"
}

function logout(){
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  location.reload();
}
