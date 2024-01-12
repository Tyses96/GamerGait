let pageTitle = document.getElementById("page-title")
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');
const gameName = urlParams.get('name')
let authchecked = false;
const minTitleLength = 5;
const minBodyLength = 32;
let verified = false;

M.AutoInit();
fetchAuth();
loadOverallRatingSection();
loadReviewBoxs();


fetch('https://gamergait.com:8443/gameDetails/' + gameId)
.then(response => response.json())
.then(data => {createGameDetailsSection(data)})

async function loadOverallRatingSection(){
    const promise = await fetch('https://gamergait.com:8443/games/' + gameId);
    const response = await promise.json()
    createOverallRatingSection(response)
  }

function createGameDetailsSection(gameDetails){
    // Image created from API call and displayed
    let headerImageUrl = gameDetails.data.header_image;
    let mainPageImageDiv = document.getElementById("game-image");
    let mainPageImage = document.createElement("img");
    mainPageImage.src = headerImageUrl;
    mainPageImageDiv.appendChild(mainPageImage);

    //Title
    let mainPageTitleDiv = document.getElementById("game-title")
    mainPageTitleDiv.innerHTML = gameName;
    pageTitle.innerHTML = gameName + " reviews"

    //Description
    let mainPageDescDiv = document.getElementById("description")
    let text = gameDetails.data.short_description.replace(/&quot;/g, '"');
    mainPageDescDiv.innerHTML = text;
}

function createOverallRatingSection(game){
    createOverallRatingIndiv(game.overallRating, "overall-rating",  "Overall rating", "s12", "m12", "l12")
    createOverallRatingIndiv(game.overallGraphicsRating, "overall-x-rating",  "Overall Graphics rating", "s6", "m6", "l3")
    createOverallRatingIndiv(game.overallGamePlayRating, "overall-x-rating",  "Overall Gameplay rating", "s6", "m6", "l3")
    createOverallRatingIndiv(game.overallStoryRating, "overall-x-rating",  "Overall <br>Story <br>rating", "s6", "m6", "l3")
    createOverallRatingIndiv(game.overallValueForMoneyRating, "overall-x-rating","Overall Value for money rating", "s6", "m6", "l3")
}

function createOverallRatingIndiv(score, elid, title, smallCol, mediumCol, largeCol){

    let box = document.getElementById(elid)

    let col = document.createElement("div")
    col.classList.add("col")
    col.classList.add(smallCol)
    col.classList.add(mediumCol)
    col.classList.add(largeCol)
    box.append(col)

    let card = document.createElement("div")
    card.classList.add("card")
    col.appendChild(card)

    let cardContent = document.createElement("div")
    cardContent.classList.add("card-content")
    card.appendChild((cardContent))

    let cardTitle = document.createElement("h5")
    cardTitle.classList.add("center")
    cardTitle.innerHTML=title
    cardContent.appendChild(cardTitle)

    let cardScore = document.createElement("h5")
    let colour = generateColourForScore(score)
    let accent = generateAccent(score)
    cardScore.classList.add(colour)
    cardScore.classList.add(accent)
    cardScore.classList.add("score")
    cardScore.classList.add("circle")
    cardScore.innerHTML = score
    cardContent.appendChild(cardScore)
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
    showCorrectReviewButton(auth, verified)
}

function setUserParams(data){
  userId = data.id;
  username = data.username;
  verified = data.verified;
}

function showCorrectReviewButton(auth, verified){
  if(auth){
      document.getElementById("login-for-review").classList.add("hide")
      if(verified){
        document.getElementById("add-review-button").classList.remove("hide")
        document.getElementById("verify-for-review").classList.add("hide")
      }
      else{
        document.getElementById("verify-for-review").classList.remove("hide")
      }
  }
}
  async function loadReviewBoxs(){
    await fetchAuth();
    //load reviews
    fetch('https://gamergait.com:8443/reviews/' + gameId)
    .then(response => response.json())
    .then(data => createReviewCards(data))
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
  let reviewContainer = document.getElementById("review-container")
  let reviebox = document.createElement("div")
  reviebox.classList.add("col")
  reviebox.classList.add("s12")
  reviebox.classList.add("m12")
  reviebox.classList.add("l6")
  reviewContainer.appendChild(reviebox)

  let card = document.createElement("div")
  card.classList.add("card")
  reviebox.appendChild(card)

  let cardContent = document.createElement("div")
  cardContent.classList.add("card-content")
  card.appendChild((cardContent))

  let cardTitle = document.createElement("h4")
  cardTitle.classList.add("center")
  cardTitle.innerHTML=title
  cardContent.appendChild(cardTitle)

  let cardBody = document.createElement("p")
  cardBody.classList.add("center")
  cardBody.innerHTML=body
  cardContent.appendChild(cardBody)

  
  let userRow = document.createElement("div")
  userRow.classList.add("row")

  let cardUsername = document.createElement("div")
  cardUsername.classList.add("right")
  cardUsername.classList.add("deep-purple-text")
  cardUsername.classList.add("text-darken-2")
  cardUsername.innerHTML= "-" + reviewUsername
  userRow.appendChild(cardUsername)
  cardContent.appendChild(userRow)

  let childRow = document.createElement("div")
  childRow.classList.add("row")
  cardContent.appendChild(childRow)

  createReviewChildCard(graphicsScore, "Graphics", childRow)
  createReviewChildCard(gameplayScore, "Gameplay", childRow)
  createReviewChildCard(storyScore, "Story", childRow)
  createReviewChildCard(valueScore, "Value for Money", childRow)
}

function createReviewChildCard(score, title, row){
  let scorebox = document.createElement("div")
  scorebox.classList.add("col")
  scorebox.classList.add("s6")
  scorebox.classList.add("m6")
  scorebox.classList.add("l6")

  let card = document.createElement("div")
  card.classList.add("card")
  scorebox.appendChild(card)

  let cardContent = document.createElement("div")
  cardContent.classList.add("card-content")
  cardContent.classList.add("center-align")
  card.appendChild((cardContent))

  let cardTitle = document.createElement("h6")

  cardTitle.innerHTML=title
  cardContent.appendChild(cardTitle)

  let cardBody = document.createElement("h6")
  cardBody.innerHTML=score
  let colour = generateColourForScore(score)
  let accent = generateAccent(score)
  cardBody.classList.add(colour)
  cardBody.classList.add(accent)
  cardBody.classList.add("score")
  cardBody.classList.add("circle")
  cardContent.appendChild(cardBody)

  row.appendChild(scorebox)
}

function addReview(){
  document.getElementById("add-review-button").classList.add("hide")
  document.getElementById("add-review-content").classList.remove("hide")
}

document.getElementById("add-review-title").addEventListener("keyup", checkTitle);
function checkTitle() {
  var val = document.getElementById("add-review-title").value;
  if(!val || !val.length) {
    return;
  }
  
  var regex = /.{5,}$/;
  if(!regex.test(val)) {
      document.getElementById("add-review-title").classList.remove("valid");
      document.getElementById("add-review-title").classList.add("invalid");
    } else {
      document.getElementById("add-review-title").classList.remove("invalid");
      document.getElementById("add-review-title").classList.add("valid");
    }
}

document.getElementById("add-review-body").addEventListener("keyup", checkBody);
function checkBody() {
  var val = document.getElementById("add-review-body").value;
  if(!val || !val.length) {
    return;
  }
  
  var regex = /.{32,}$/;
  if(!regex.test(val)) {
      document.getElementById("add-review-body").classList.remove("valid");
      document.getElementById("add-review-body").classList.add("invalid");
    } else {
      document.getElementById("add-review-body").classList.remove("invalid");
      document.getElementById("add-review-body").classList.add("valid");
    }
}

async function postReview(){
    let titleString = document.getElementById("add-review-title").value
    let bodyString = document.getElementById("add-review-body").value
    let graphicsRating = document.getElementById("graphics-slider").value
    let gameplayRating = document.getElementById("gameplay-slider").value
    let storyRating = document.getElementById("story-slider").value
    let valueRating = document.getElementById("value-slider").value
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
              "gameId": gameId
          }
      )
        })
      location.reload();
    }
}