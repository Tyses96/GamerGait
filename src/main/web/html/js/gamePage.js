let header = document.getElementById("header");

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');
const gameName = urlParams.get('name')
const pagetitle = document.getElementById("main-title")

let userId;
let username;

const minTitleLength = 5
const minBodyLength = 24

fetchAuth();

loadReviewBoxs();

fetch('https://gamergait.com:8443/gameDetails/' + gameId)
.then(response => response.json())
.then(data => {createGameDetailsSection(data)})

loadOverallRatingSection();

async function loadOverallRatingSection(){
  const promise = await fetch('https://gamergait.com:8443/games/' + gameId);
  const response = await promise.json()
  createOverallRatingSection(response)
}

async function loadReviewBoxs(){
    await fetchAuth();
    //load reviews
    fetch('https://gamergait.com:8443/reviews/' + gameId)
    .then(response => response.json())
    .then(data => createReviewCards(data))
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

function searchGames(text){
    if(text == null){
        text = ""
    }
	x = document.getElementById("searchbar");
        fetch('https://gamergait.com:8443/games/search=' + x.value.toString() + text +  "?page=" + pageNumber)
        .then(response => response.json())
        .then(data => {createCards(data)})
}
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

    userId = data.id;
    username = data.username;


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

    
  //Review profile data
  //Removing login message
  let initialloginmsg = document.getElementById("initial-login");
  initialloginmsg.remove();
  
  //Adding add review button
  const buttonHolderDiv = document.createElement("div")
  buttonHolderDiv.classList.add("review-button-holder")
  let reviewbutton = "<button id=\"add-review-button\" onclick=\"addReview()\">+</button>";
  let reviewbuttonholder = document.getElementById("add-review-holder")
  reviewbuttonholder.innerHTML = reviewbutton;
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
function createReviewCards(game){

    let length = game.length
    if(length > 0){
      game.forEach(async(review) => {
        createReviewCard(review.title, review.body, review.graphicsRating, review.gamePlayRating, review.storyRating, review.valueForMoneyRating, review.profileEntity.username)
      })
    }
    else{
      const addReviewHolder = document.getElementById("add-review-holder")
      const noReviewsDiv = document.createElement("div")
      noReviewsDiv.classList.add("reviewBox")
      const noReviewsTitle = document.createElement("div")
      noReviewsTitle.classList.add("review-title")
      noReviewsTitle.classList.add("review-title-span")
      noReviewsTitle.innerHTML = "No reviews yet, be the first!"
      noReviewsDiv.appendChild(noReviewsTitle)
      addReviewHolder.appendChild(noReviewsDiv)
    }
}

function createReviewCard(title, body, graphicsScore, gameplayScore, storyScore, valueScore, reviewUsername){
  const addReviewHolder = document.getElementById("add-review-holder")
  const box = document.createElement("div")
  box.classList.add("reviewbox")

  const titleDiv = document.createElement("div")
  titleDiv.classList.add("review-title")
  const titleSpan = document.createElement("span")
  titleSpan.classList.add("review-title-span")
  titleSpan.innerHTML = title
  titleDiv.appendChild(titleSpan)
  box.appendChild(titleDiv)

  const bodyDiv = document.createElement("div")
  bodyDiv.classList.add("review-body")
  const bodySpan = document.createElement("span")
  bodySpan.classList.add("review-body-span")
  bodySpan.innerHTML = body
  const usernameSpan = document.createElement("div")
  usernameSpan.classList.add("username-span")
  usernameSpan.innerHTML = "- " + reviewUsername
  bodyDiv.appendChild(bodySpan)
  bodyDiv.appendChild(usernameSpan)
  box.appendChild(bodyDiv)



  const scoresHolderDiv = document.createElement("div")
  scoresHolderDiv.classList.add("review-scores-holder")

  const graphicsScoreDiv = createScoreDiv("Graphics", graphicsScore)
  scoresHolderDiv.appendChild(graphicsScoreDiv)

  const gameplayScoreDiv = createScoreDiv("Gameplay", gameplayScore)
  scoresHolderDiv.appendChild(gameplayScoreDiv)

  const storyScoreDiv = createScoreDiv("Story", storyScore)
  scoresHolderDiv.appendChild(storyScoreDiv)

  const valueScoreDiv = createScoreDiv("Value for money", valueScore)
  scoresHolderDiv.appendChild(valueScoreDiv)

  box.appendChild(scoresHolderDiv)

  styleBox(box);
  if(reviewUsername == username){
    //TODO remove "add review" button and remove backend capability
    document.getElementById("add-review-button").remove();
    box.style.boxShadow = "0 0 20px #1EBB39"
    addReviewHolder.prepend(box)
  }
  else{
    addReviewHolder.appendChild(box)
  }



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

function createScoreDiv(upperCase, score){
  const scoreDiv = document.createElement("div")
  scoreDiv.classList.add("review-score")

  const scoreDivTitle = document.createElement("p")
  scoreDivTitle.classList.add("score-div-title")

  scoreDivTitle.innerHTML= upperCase + " "

  const scoreSpan = document.createElement("p")
  scoreSpan.classList.add("score-top-picks")
  scoreSpan.innerHTML = score
  if(score < 10){
    scoreSpan.style.width = "2.5rem";
  }
  if(score < 25){
    scoreSpan.style.backgroundColor = "#ee4f44";
  }
  else if(score >25 && score <65){
    scoreSpan.style.backgroundColor = "#dfcd81";
  }
  else {
    scoreSpan.style.backgroundColor = "#1EBB39";
  }
  scoreDiv.appendChild(scoreDivTitle)
  scoreDiv.appendChild(scoreSpan)
  return scoreDiv
}

function addReview(){
    let reviewButton = document.getElementById("add-review-button")
    reviewButton.remove();
    let addReviewHolder = document.getElementById("add-review-holder")
  
    //Submit button
  let createReviewSubmitButton = document.createElement("div")
  createReviewSubmitButton.id = "create-review-submit-button"
  createReviewSubmitButton.innerHTML = "<button class =\"header-button\" onclick=\"submitReview()\">Submit</button>"
  
  addReviewHolder.prepend(createReviewSubmitButton)
  
   //Add individual sliders
  
   //Graphics
   
   let createReviewGraphicsSlider = document.createElement("div")
   createReviewGraphicsSlider.id = "create-review-graphics"
   createReviewGraphicsSlider.classList.add("slider-holder")
   let graphicsValDesc = document.createElement("p")
   graphicsValDesc.classList.add("valDesc")
   graphicsValDesc.innerHTML = "Graphics: "
   let graphicsSpan = document.createElement("span")
   graphicsSpan.id = "graphicsValue"
   graphicsSpan.classList.add("sliderValue")
   graphicsSpan.innerHTML = "50"
   let graphicsSliderInput = document.createElement("input")
   setDefaultSliderValues(graphicsSliderInput, "graphics")
   createReviewGraphicsSlider.appendChild(graphicsValDesc)
   createReviewGraphicsSlider.appendChild(graphicsSpan)
   createReviewGraphicsSlider.appendChild(graphicsSliderInput)
  
   //Gameplay
   let createReviewGameplaySlider = document.createElement("div")
   createReviewGameplaySlider.id = "create-review-gameplay"
   createReviewGameplaySlider.classList.add("slider-holder")
   let gameplayValDesc = document.createElement("p")
   gameplayValDesc.classList.add("valDesc")
   gameplayValDesc.innerHTML = "Gameplay: "
   let gameplaySpan = document.createElement("span")
   gameplaySpan.id = "gameplayValue"
   gameplaySpan.classList.add("sliderValue")
   gameplaySpan.innerHTML = "50"
   let gameplaySliderInput = document.createElement("input")
   setDefaultSliderValues(gameplaySliderInput, "gameplay")
   createReviewGameplaySlider.appendChild(gameplayValDesc)
   createReviewGameplaySlider.appendChild(gameplaySpan)
   createReviewGameplaySlider.appendChild(gameplaySliderInput)
  
   //Story
  let createReviewStorySlider = document.createElement("div")
  createReviewStorySlider.id = "create-review-story"
  createReviewStorySlider.classList.add("slider-holder")
  let storyValDesc = document.createElement("p")
  storyValDesc.classList.add("valDesc")
  storyValDesc.innerHTML = "Story: "
  let storySpan = document.createElement("span")
  storySpan.id = "storyValue"
  storySpan.classList.add("sliderValue")
  storySpan.innerHTML = "50"
  let storySliderInput = document.createElement("input")
  setDefaultSliderValues(storySliderInput, "story")
  createReviewStorySlider.appendChild(storyValDesc)
  createReviewStorySlider.appendChild(storySpan)
  createReviewStorySlider.appendChild(storySliderInput)
  
  
  //Value for money
  let createReviewValueSlider = document.createElement("div")
  createReviewValueSlider.id = "create-review-value"
  createReviewValueSlider.classList.add("slider-holder")
  let valueValDesc = document.createElement("p")
  valueValDesc.classList.add("valDesc")
  valueValDesc.innerHTML = "Value for money: "
  let valueSpan = document.createElement("span")
  valueSpan.id = "valueValue"
  valueSpan.classList.add("sliderValue")
  valueSpan.innerHTML = "50"
  let valueSliderInput = document.createElement("input")
  setDefaultSliderValues(valueSliderInput, "value")
  createReviewValueSlider.appendChild(valueValDesc)
  createReviewValueSlider.appendChild(valueSpan)
  createReviewValueSlider.appendChild(valueSliderInput)
  
   // Add scores
   let createReviewScores = document.createElement("div")
   createReviewScores.id = "create-review-scores"
  
   
  createReviewScores.appendChild(createReviewGraphicsSlider)
  createReviewScores.appendChild(createReviewGameplaySlider)
  createReviewScores.appendChild(createReviewStorySlider)
  createReviewScores.appendChild(createReviewValueSlider)
  
  addReviewHolder.prepend(createReviewScores)
  
   // Add body
   let createReviewBody = document.createElement("div")
   createReviewBody.id = "create-review-body"
   createReviewBody.innerHTML= "<textarea type=\"text\" class=\"textArea\" id=\"Body\" name = \"Body\" placeholder=\"Body...\" rows=\"10\" cols =\"100\" required minlength=\"24\" maxlength=\"2500\"></textarea>"
   addReviewHolder.prepend(createReviewBody)
  
    // Add title
    let createReviewTitle = document.createElement("div")
    createReviewTitle.id = "create-review-title"
    createReviewTitle.innerHTML = "<textarea type=\"text\" class=\"textArea\" id=\"Title\" name = \"Title\" placeholder=\"Title...\" rows=\"2\" cols = \"100\" required minlength=\"5\" maxlength=\"64\"></textarea>"
    addReviewHolder.prepend(createReviewTitle);
  
  
    var graphicsslider = document.getElementById("graphicsRange");
    var graphicsoutput = document.getElementById("graphicsValue");
    graphicsoutput.innerHTML = graphicsslider.value; // Display the default slider value
  
    // Update the current slider value (each time you drag the slider handle)
    graphicsslider.oninput = function() {
    graphicsoutput.innerHTML = this.value;}
  
    var gameplayslider = document.getElementById("gameplayRange");
    var gameplayoutput = document.getElementById("gameplayValue");
    gameplayoutput.innerHTML = gameplayslider.value; // Display the default slider value
  
    // Update the current slider value (each time you drag the slider handle)
    gameplayslider.oninput = function() {
    gameplayoutput.innerHTML = this.value;}
  
    var storyslider = document.getElementById("storyRange");
    var storyoutput = document.getElementById("storyValue");
    storyoutput.innerHTML = storyslider.value; // Display the default slider value
  
    // Update the current slider value (each time you drag the slider handle)
    storyslider.oninput = function() {
   storyoutput.innerHTML = this.value;}
  
    var valueslider = document.getElementById("valueRange");
    var valueoutput = document.getElementById("valueValue");
   valueoutput.innerHTML = valueslider.value; // Display the default slider value
  
    // Update the current slider value (each time you drag the slider handle)
    valueslider.oninput = function() {
    valueoutput.innerHTML = this.value;}
  }
  
  async function submitReview(){
    let titleString = document.getElementById("Title").value
    let bodyString = document.getElementById("Body").value
    let graphicsRating = document.getElementById("graphicsValue").innerHTML
    let gameplayRating = document.getElementById("gameplayValue").innerHTML
    let storyRating = document.getElementById("storyValue").innerHTML
    let valueRating = document.getElementById("valueValue").innerHTML
    if(titleString.length < minTitleLength){
      alert("Title needs to be atleast " + minTitleLength + " characters long")
    }
    else if(bodyString.length < minBodyLength){
      alert("Body needs to be atleast " + minBodyLength + " characters long")
    }
    else{
    await fetch("https://gamergait.com:8443/reviews", {
      method: "POST",
  headers: {
    "Content-Type": "application/json",
  
    },
      body: JSON.stringify(
          {
              "title":titleString, 
              "body":bodyString,
              "graphicsRating":graphicsRating,
              "gamePlayRating":gameplayRating,
              "storyRating":storyRating,
              "valueForMoneyRating":valueRating,
              "profileId": userId,
              "gameId":gameId
          }
      )
        })
      location.reload();
    }
  }
  
  
  function setDefaultSliderValues(slider, sliderId){
    slider.type = "range"
    slider.min = "1"
    slider.max = "100"
    slider.value = "50"
    slider.classList.add("slider")
    slider.id = sliderId +"Range"
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
    mainPageTitleTextArea.classList.add("title-text-area")
    mainPageTitleTextArea.textContent = gameName;
    mainPageTitleDiv.appendChild(mainPageTitleTextArea);
    pagetitle.innerHTML = gameName + " reviews"

    //Description
    let mainPageDescDiv = document.getElementById("description")
    let mainPageDescTextArea = document.createElement("p")
    mainPageDescTextArea.classList.add("description-class")
    let text = gameDetails.data.short_description.replace(/&quot;/g, '"');
    mainPageDescTextArea.textContent = text;
    mainPageDescDiv.appendChild(mainPageDescTextArea);

}

async function createOverallRatingSection(game){
  console.log(game)
  let container = document.getElementById("overall-rating-holder")

  createOverallRatingIndiv(game.overallRating, container, "overall-rating", "Overal rating")
  createOverallRatingIndiv(game.overallGraphicsRating, container, "overall-graphics-rating", "Overall Graphics rating")
  createOverallRatingIndiv(game.overallGamePlayRating, container, "overall-gameplay-rating", "Overall Gameplay rating")
  createOverallRatingIndiv(game.overallStoryRating, container, "overall-story-rating", "Overall Story rating")
  createOverallRatingIndiv(game.overallValueForMoneyRating, container, "overall-value-rating", "Overall Value for money rating")
}

function createOverallRatingIndiv(score, container, elid, title){
  let rating = document.createElement("div")

  rating.classList.add("ovl-rating")
  rating.id=elid

  let ratingtitle = document.createElement("div");
  ratingtitle.classList.add("rating-title")
  ratingtitle.innerHTML = title + ": "

  rating.appendChild(ratingtitle)

  ratingscore = document.createElement("div")
  ratingscore.classList.add("score-top-picks")
  ratingscore.innerHTML = score

  rating.appendChild(ratingscore)
  container.appendChild(rating)
  if(score < 10){
    ratingscore.style.width = "2.5rem";
    
}
if(score <1){
    ratingscore.innerHTML = "No scores yet"
    ratingscore.style.width = "fit-content";
    ratingscore.style.boxShadow = "none";
}
else if(score < 25){
    ratingscore.style.backgroundColor = "#ee4f44";
  }
  else if(score >25 && score <65){
    ratingscore.style.backgroundColor = "#dfcd81";
  }
  else {
    ratingscore.style.backgroundColor = "#1EBB39";
  }
  ratingscore.style.marginTop = "0";
  ratingscore.style.marginBottom = "0";



}

function invalidTextArea(){
    document.getElementById("create-review-submit-button").disabled = true;
  }
  
  function validTextArea(){
    document.getElementById("create-review-submit-button").disabled = false;
  }
  function getCookie(name) { 
    var re = new RegExp(name + "=([^;]+)"); 
    var value = re.exec(document.cookie); 
    return (value != null) ? unescape(value[1]) : null; 
   }
   function searchGames(text){
    if(text == null){
        text = ""
    }
	x = document.getElementById("searchbar");
    window.location.href = "searchPage.html?search=" + x.value;
}
