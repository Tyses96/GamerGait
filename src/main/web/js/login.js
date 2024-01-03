

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
    .then(response => response.json())
    .then(data => {
		if(data.token == null){
			incorrectUserOrPass()
		}
		else{
			storeCookie(data)
		}
	})
}

function incorrectUserOrPass(){
	let userMsg = document.getElementById("error-username")
	userMsg.innerHTML = "Incorrect username or password"
}

function resetFormErrors(){
    const errors = document.getElementsByClassName("errormsg");
    for(var i = 0; i < errors.length; i++){
        errors[i].innerHTML = "";
    }
}

function storeCookie(cookie){
	const d = new Date(cookie.expiry.toString());
	document.cookie = "token=" + cookie.token + ";" +  "expires=" + d.toUTCString() + ";" + "path=/;";
	goBack();
}