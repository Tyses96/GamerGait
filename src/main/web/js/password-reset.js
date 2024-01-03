

function goBack(){
    window.location.replace(document.referrer)
}

function resetFormErrors(){
    const errors = document.getElementsByClassName("errormsg");
    for(var i = 0; i < errors.length; i++){
        errors[i].innerHTML = "";
    }
}
function sendEmail(){
    const email = document.getElementById("email").value
    fetch("https://gamergait.com:8443/password-reset", {
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
          const formContainer = document.getElementById("form-container");
          formContainer.innerHTML="<centre><h1 id=success-msg>Password Reset request complete!</h1></centre>"
          setTimeout(function(){
            goBack()}, 3000)
}