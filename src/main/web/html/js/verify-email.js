fetchAuth()

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
            setCorrectPage(data)
        });
    }
    else auth = false;
    showProfileDetailsNavBar(auth)
}

function setCorrectPage(data){
    console.log(data.verified)
    if(data.verified){
        document.getElementById("unveri-form").classList.add("hide")
        document.getElementById("veri-form").classList.remove("hide")
    }
}
function sendEmail(){
    const email = document.getElementById("email").value
    fetch("https://gamergait.com:8443/send-verification-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

              },
            body: JSON.stringify(
                {
                    "email":email, 
                }
            ),
          });
          const formContainer = document.getElementById("registration-form");
          formContainer.innerHTML="<h6 class=\"center\">If the email address matches the one on this account, an email verification link has been sent.</h6><br><p class=\"center\">Go <a href=\"index.html\">home<a/></p>"
}