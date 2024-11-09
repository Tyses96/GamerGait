
let UserID;

fetchAuth();

M.AutoInit();



function fetchAuth(){
    const promise = 
    fetch('https://gamergait.com:8443/auth/' + document.cookie);``
  
    promise.then((response) => {
        handleAuthResponse(response)
    })
  }

  function handleAuthResponse(response){
    if(response.status === 200){
        auth = true;
        response.json().then((data) => {
            setUserParams(data)
            fillProfileData(data)
        });
    }
    else auth = false;
    showProfileDetailsNavBar(auth)
}

function fillProfileData(data){
    document.getElementById("user-id").innerHTML = data.id;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("verified-email").innerHTML = data.verified;
    document.getElementById("username").innerHTML = data.username;
    document.getElementById("gaits").innerHTML = data.gaits;
    document.getElementById("total-reviews").innerHTML = data.totalReviews;
    document.getElementById("standing").innerHTML = data.standing;

    UserID = data.id;
    fetchGaitTickets();
  }

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

function buyGaitPoolTicket(){

    fetch('https://gamergait.com:8443/buy-gait-ticket', {
        method: "POST",
		headers: {
			"Content-Type": "application/json",

		  },
        body: JSON.stringify(
            {
                "id":userId, 
            }
        )
    })

    location.reload()
}

function fetchGaitTickets(){
    fetch('https://gamergait.com:8443/check-tickets/' + UserID)
    .then(response => response.json())
    .then(data => {setGaitTickets(data.length)})
}

function setGaitTickets(num){
    document.getElementById("gait-pool-tickets").innerHTML= num
}