const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('t');
const passwordLength = 8;

function changePassword(){
    let password = document.getElementById("psw").value;
    let repassword = document.getElementById("psw-repeat").value;


    if(password === repassword && password.length >= passwordLength && userName.length >= usernameLength){
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
    else if(password != password){
        passwordsDontMatch();
    }
    else if (password.length < passwordLength){
        passwordTooShort()
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
    const formContainer = document.getElementById("form-container");
    formContainer.innerHTML="<centre><h1 id=success-msg>Password Changed! Please close this window.</h1></centre>"
}
function tokenInvalid(){
    const formContainer = document.getElementById("form-container");
    formContainer.innerHTML="<centre><h1 id=success-msg>Password not changed. Invalid token. Token is either expired (12 hours) or this link is broken. Please try request a new one!</h1></centre>"
}
function passwordsDontMatch(){
    let errmsg = document.getElementById("error-password");
    errmsg.innerHTML = "Passwords did not match "
}
function passwordTooShort(){
    let errmsg = document.getElementById("error-password");
    errmsg.innerHTML = "Password is not complex enough - must be at least " + passwordLength + " characters"
}
function resetFormErrors(){
    const errors = document.getElementsByClassName("errormsg");
    for(var i = 0; i < errors.length; i++){
        errors[i].innerHTML = "";
    }
}