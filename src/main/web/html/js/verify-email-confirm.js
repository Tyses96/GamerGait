const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('t');

fetchAuth();

fetchVerification();

function fetchVerification(){
    const promise = 
    fetch('https://gamergait.com:8443/confirm-verification-email/' + token);``
  
    promise.then((response) => {
        handleVerificationResponse(response)
    })
  }


function handleVerificationResponse(response){
    if(response.status === 200){
        document.getElementById("response-message").innerHTML = "Successfully verified email"
    }
    else document.getElementById("response-message").innerHTML = "Unable to verify email. Your token may have expired or the server may have restarted since issuing the token. Please try again. If this issue persists please contact <a href=\"mailto: admin@gamergait.com\">admin@gamergait.com</a>."
}