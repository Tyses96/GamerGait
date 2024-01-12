fetchAuth();

function registerUser(){
    let userName = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repeat-password").value;
    const passwordLength = 8;
    const usernameLength = 6;



    if(password === repassword && password.length >= passwordLength && userName.length >= usernameLength){
        const promise = fetch("https://gamergait.com:8443/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

              },
            body: JSON.stringify(
                {
                    "username":userName, 
                    "email":email, 
                    "password":password
                }
            ),
          });
          
          promise.then((response) => {
            handleRegisterResponse(response)
          }).then((json) => console.log(json));

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
    }

    function handleRegisterResponse(response){
        switch(response.status){
            case 500:
                invalidInputSentToServer();
                break;
            case 400:
                usernameAlreadyTaken();
                break;
            case 409:
                emailAlreadyTaken();
                break;
            case 201:
                successfulCreation();
                break;
        }
    }
    function usernameAlreadyTaken(){
        let span1 = document.getElementById("username-span1");
        span1.classList.add("hide")
        let span2 = document.getElementById("username-span2");
        span2.classList.remove("hide")

        errfield = document.getElementById("username")
        errfield.classList.remove("valid")
        errfield.classList.add("invalid")
    }
    function emailAlreadyTaken(){
        let span1 = document.getElementById("email-span1");
        span1.classList.add("hide")
        let span2 = document.getElementById("email-span2");
        span2.classList.remove("hide")

        errfield = document.getElementById("email")
        errfield.classList.remove("valid")
        errfield.classList.add("invalid")
    }
    function successfulCreation(){
        const formContainer = document.getElementById("registration-form");
        formContainer.innerHTML="<div class=\"center\"><h2>Registration Complete</h2><p>A verification email has been sent to your email address. Please follow it to verify your account.</p><p>Go <a href=\"index.html\">home</a></p></div>"
    }
}

function goBack(){
    window.location.href = "index.html";
}


document.getElementById("username").addEventListener("keyup", checkUsername);
function checkUsername() {
    var val = document.getElementById("username").value;
    if(!val || !val.length) {
      return;
    }
    
    var regex = /^[a-zA-Z0-9]{6,12}$/gi;
    if(!regex.test(val)) {
      document.getElementById("username").classList.remove("valid");
      document.getElementById("username").classList.add("invalid");
    } else {
      document.getElementById("username").classList.remove("invalid");
      document.getElementById("username").classList.add("valid");
    }
}

document.getElementById("email").addEventListener("keyup", checkEmail);
function checkEmail() {
    var val = document.getElementById("email").value;
    if(!val || !val.length) {
      return;
    }
    
    var regex = new RegExp("^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$");
    if(!regex.test(val)) {
        document.getElementById("email").classList.remove("valid");
        document.getElementById("email").classList.add("invalid");
      } else {
        document.getElementById("email").classList.remove("invalid");
        document.getElementById("email").classList.add("valid");
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

