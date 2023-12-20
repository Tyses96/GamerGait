window.onscroll = function() {scrollStick()};
let header = document.getElementById("header");
let sticky = header.offsetTop;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const gameName = urlParams.get('name')

fetch('http://localhost:8080/gameDetails/' + id)
.then(response => response.json())
.then(data => {createGameDetailsSection(data)})



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
    mainPageDescTextArea.textContent = gameDetails.data.short_description;
    mainPageDescDiv.appendChild(mainPageDescTextArea);
}


function scrollStick() {
    if (window.scrollY > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }