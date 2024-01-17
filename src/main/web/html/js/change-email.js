let user;
let pass;
fetchAuth();



function fetchAuth(){
    const promise = 
    fetch('https://gamergait.com:8443/auth/' + document.cookie);``
  
    promise.then((response) => {
        handleAuthResponse(response)
    })
  }


function login(){

    let username = document.getElementById("username").value
    let psw = document.getElementById("password").value;

    fetch('https://gamergait.com:8443/login', {
        method: "POST",
		headers: {
			"Content-Type": "application/json",

		  },
        body: JSON.stringify(
            {
                "username":username, 
                "password":psw
            }
        )
    })
    .then(response => handleEmailChangeResponse(response, username, psw))
}

function handleEmailChangeResponse(response,usr,psw){
    if (response.status == 200){
        user = usr;
        pass = psw;
        showChangeEmail()
    }
    else if (response.status == 423){
        accountLocked()
    }
    else{
        incorrectUserOrPass()
    }
}

function incorrectUserOrPass(){
    let usernameMsg = document.getElementById("username");
    usernameMsg.classList.remove("valid")
    usernameMsg.classList.add("invalid")
}

function accountLocked(){
    let usernameMsg = document.getElementById("username");
    let span1 = document.getElementById("username-span1")
    let span2 = document.getElementById("username-span2")
    span1.classList.add("hide")
    span2.classList.remove("hide")
    usernameMsg.classList.remove("valid")
    usernameMsg.classList.add("invalid")
}


function showChangeEmail(){
    document.getElementById("registration-form").classList.add("hide")
    document.getElementById("email-change-form").classList.remove("hide")
}

function changeEmail(){
    let email = document.getElementById("email").value

    fetch('https://gamergait.com:8443/change-email', {
        method: "POST",
		headers: {
			"Content-Type": "application/json",

		  },
        body: JSON.stringify(
            {
                "email":email,
                "username":username, 
                "password":pass
            }
        )
    })
    .then(response => handleChangeEmailResponse(response))
}

function handleChangeEmailResponse(response){
    document.getElementById("email-change-form").classList.add("hide")
    if (response.status == 200){
        document.getElementById("confirm-email-change").classList.remove("hide")
    }
    else{
        document.getElementById("deny-email-change").classList.remove("hide")
    }
}