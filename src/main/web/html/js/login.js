function goBack(){
    window.location.replace(document.referrer)
}
function register(){
    window.location.href = "register.html"
}
function login(){
    let username = document.getElementById("username").value
    let psw = document.getElementById("psw").value;

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

function incorrectUserOrPass(){
	let userMsg = document.getElementById("error-username") 
	userMsg.innerHTML = "Incorrect username or password"
}

function resetFormErrors(){
    const errors = document.getElementsByClassName("errormsg");
    for(var i = 0; i < errors.length; i++){
        errors[i].innerHTML = "";
        errors[i].style.display = "none;"
    }
}

function storeCookie(cookie){
	const d = new Date(cookie.expiry.toString());
	document.cookie = "token=" + cookie.token + ";" +  "expires=" + d.toUTCString() + ";" + "path=/;";
	window.location.href = "index.html";
}

function accountLocked(){
    let userMsg = document.getElementById("error-username")
	userMsg.innerHTML = "Maximum tries reached. Account on cooldown for 10 minutes, resetting your password will unlock the account."
}