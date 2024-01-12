fetchAuth()


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
    .then(response => handleResponse(response))
}

function handleResponse(response){
    if (response.status == 200){
        response.json().then(data => storeCookie(data))
    }
    else if (response.status == 423){
        accountLocked()
    }
    else{
        incorrectUserOrPass()
    }
}

function storeCookie(cookie){
	const d = new Date(cookie.expiry.toString());
	document.cookie = "token=" + cookie.token + ";" +  "expires=" + d.toUTCString() + ";" + "path=/;";
	window.location.href = "index.html";
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