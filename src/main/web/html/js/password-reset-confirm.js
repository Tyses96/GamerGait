const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('t');
const passwordLength = 8;
let authchecked = false;

function changePassword(){
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repeat-password").value;


    if(password === repassword && password.length >= passwordLength){
        const promise = fetch("https://gamergait.com:8443/password-reset/" + token, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

              },
            body: JSON.stringify(
                {
                    "password":password
                }
            ),
          });
          
          promise.then((response) => {
            handleRegisterResponse(response)
          })
    }

    function handleRegisterResponse(response){
        switch(response.status){
            case 400:
                tokenInvalid();
                break;
            case 202:
                successfulChange();
                break;
        }
    }
}

function successfulChange(){
    const formContainer = document.getElementById("registration-form");
    formContainer.innerHTML="<h6 class=\"center geen-text\">Successfully changed password.</h6><br><p class=\"center\">Go <a href=\"index.html\">home</a> or close this window</p>"
}
function tokenInvalid(){
    const formContainer = document.getElementById("registration-form");
    formContainer.innerHTML="<h6 class=\"center red-text\">Password not changed. Invalid token. Token is either expired (12 hours) or this link is broken. Please try to request a new one!</h6><br><p class=\"center\">Go <a href=\"index.html\">home</a> or close this window</p>"
}

document.getElementById("repeat-password").addEventListener("keyup", checkRepeatPassword);
function checkRepeatPassword(){
  checkPassword()
  let psw1 = document.getElementById("password").value;
  let psw2 = document.getElementById("repeat-password").value;

  if(psw1 === psw2 && document.getElementById("password").classList.contains("valid")) {
      document.getElementById("repeat-password").classList.remove("invalid");
      document.getElementById("repeat-password").classList.add("valid");

    } else {
      document.getElementById("repeat-password").classList.remove("valid");
      document.getElementById("repeat-password").classList.add("invalid");
    }
}
document.getElementById("password").addEventListener("keyup", checkPassword);
function checkPassword() {
  var val = document.getElementById("password").value;
  if(!val || !val.length) {
    return;
  }
  
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if(!regex.test(val)) {
      document.getElementById("password").classList.remove("valid");
      document.getElementById("password").classList.add("invalid");
    } else {
      document.getElementById("password").classList.remove("invalid");
      document.getElementById("password").classList.add("valid");
    }
}