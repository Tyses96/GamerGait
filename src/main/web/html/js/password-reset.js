let authchecked = false;
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
          const formContainer = document.getElementById("registration-form");
          formContainer.innerHTML="<h6 class=\"center\">If the email address exists, a password reset link has been sent.</h6><br><p class=\"center\">Go <a href=\"index.html\">home<a/></p>"
}