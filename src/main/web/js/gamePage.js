
let header = document.getElementById("header");

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');
const gameName = urlParams.get('name')

let userId;
let username;

const minTitleLength = 5
const minBodyLength = 24

loadReviewBoxs();

fetch('https://localhost:8443/gameDetails/' + gameId)
.then(response => response.json())
.then(data => {createGameDetailsSection(data)})


function searchGames(){
  let text = document.getElementById("searchbar").value
  window.location.href = "index.html?search=" + text
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
  bodyDiv.classList.add("reiew-body")
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
  if(reviewUsername == username){
    //TODO remove "add review" button and remove backend capability
    box.style.boxShadow = "0 0 20px #1EBB39"
    addReviewHolder.prepend(box)
  }
  else{
    addReviewHolder.appendChild(box)
  }
}

function createScoreDiv(upperCase, score){
  const scoreDiv = document.createElement("div")
  scoreDiv.classList.add("review-score")

  const scoreDivTitle = document.createElement("p")
  scoreDivTitle.classList.add("score-div-title")

  scoreDivTitle.innerHTML= upperCase + " "

  const scoreSpan = document.createElement("p")
  scoreSpan.classList.add("score")
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
async function fetchAuth(){
  const promise = await fetch('https://localhost:8443/auth/' + document.cookie);
  const response = await promise
  handleAuthResponse(response)
}

function checkAuth(data){
  if(auth){
          showProfileDetails(data)
  }
}

async function loadReviewBoxs(){
    await fetchAuth();
    //load reviews
    fetch('https://localhost:8443/reviews/' + gameId)
    .then(response => response.json())
    .then(data => createReviewCards(data))
}

function showProfileDetails(data){

  userId = data.id;
  username = data.username;

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
  await fetch("https://localhost:8443/reviews", {
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
            "profileId":userId,
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
    mainPageTitleTextArea.classList.add("title-text-area")
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

function invalidTextArea(){
  document.getElementById("create-review-submit-button").disabled = true;
}

function validTextArea(){
  document.getElementById("create-review-submit-button").disabled = false;
}

function goBack(){
  window.location.replace(document.referrer)
}