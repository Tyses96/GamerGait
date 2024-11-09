let topRatedPageNumber = 0;
let topValuePageNumber = 0;
let maxPages = 0;
let pageSize = 4;
const maxRatingCalls = 8;
const maxValueCalls = 8;
const urlParams = new URLSearchParams(window.location.search);
let header = document.getElementById("header");
let searched = urlParams.get("search")
let auth = false;
let authchecked = false;


M.AutoInit();
getMonthlyTopPicks();
getTopValue();
getTopRated();
fetchAuth();


function fetchAuth(){
  const promise = 
  fetch('https://gamergait.com:8443/auth/' + document.cookie);``

  promise.then((response) => {
      handleAuthResponse(response)
  })
}
function getMonthlyTopPicks(){
    fetch('https://gamergait.com:8443/picksofthemonth')
    .then(response => response.json())
    .then(data => {createCards(data, document.getElementById("top-picks"))})
}

function getTopValue(){
    fetch('https://gamergait.com:8443/topvalue?size=' + pageSize +"&page="+ topValuePageNumber)
    .then(response => response.json())
    .then(data => {createCardsPageable(data, document.getElementById("top-value"), false)})
}

function getTopRated(){
    fetch('https://gamergait.com:8443/toprated?size=' + pageSize +"&page=" + topRatedPageNumber)
    .then(response => response.json())
    .then(data => {createCardsPageable(data, document.getElementById("top-rated")), false})
}
function getMoreTopRated(){
  topRatedPageNumber += 1;
  getTopRated();
  if(topRatedPageNumber == maxRatingCalls){
    let button = document.getElementById("rate-see-more")
    button.classList.add("hide")
  }
}
function getMoreTopValue(){
  topValuePageNumber += 1;
  getTopValue();
  if(topValuePageNumber >= maxValueCalls){
    let button = document.getElementById("val-see-more")
    button.classList.add("hide")
  }
}



function goBack(){
    document.getElementById("searchbar").value = ""
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

  function itemCardClicked(name, id){
    window.location.href = "gamePage.html?name=" + name + "&id=" + id
}




