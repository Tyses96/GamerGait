

function registerUser(){
    let userName = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("psw").value;
    let repassword = document.getElementById("psw-repeat").value;
    const passwordLength = 6;
    const usernameLength = 5;

    if(password === repassword && password.length >= passwordLength && userName.length >= usernameLength){
        const promise = fetch("http://localhost:8080/register", {
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
    }
    else if(password != password){
        passwordsDontMatch();
    }
    else if(userName.length < usernameLength){
        usernameTooShort()
    }
    else if (password.length < passwordLength){
        passwordTooShort()
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


    function invalidInputSentToServer(){
        let errmsg = document.getElementById("error-server");
        errmsg.innerHTML = "Invalid data. Ensure a valid email is entered and your username is between 5 and 16 characters."
    }
    function usernameAlreadyTaken(){
        let errmsg = document.getElementById("error-username");
        errmsg.innerHTML = "Username already in use";
    }
    function usernameTooShort(){
        let errmsg = document.getElementById("error-username");
        errmsg.innerHTML = "Username too short. Minimum 5 characters";
    }
    function emailAlreadyTaken(){
        let errmsg = document.getElementById("error-email");
        errmsg.innerHTML = "Email already in use"
    }
    function passwordsDontMatch(){
        let errmsg = document.getElementById("error-password");
        errmsg.innerHTML = "Passwords did not match "
    }
    function passwordTooShort(){
        let errmsg = document.getElementById("error-password");
        errmsg.innerHTML = "Password is not complex enough - must be at least 6 characters"
    }
    function successfulCreation(){
        const formContainer = document.getElementById("form-container");
        formContainer.innerHTML="<centre><h1 id=success-msg>Registration Complete</h1></centre>"

        setTimeout(function(){
            goBack()}, 3000)
    }
}

function resetFormErrors(){
    const errors = document.getElementsByClassName("errormsg");
    for(var i = 0; i < errors.length; i++){
        errors[i].innerHTML = "";
    }
}

function goBack(){
    window.location.href = "index.html";
}
