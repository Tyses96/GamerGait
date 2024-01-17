let authchecked = false;
fetchAuth();

function fetchAuth(){
    const promise = 
    fetch('https://gamergait.com:8443/auth/' + document.cookie);``
  
    promise.then((response) => {
        handleAuthResponse(response)
    })
  }