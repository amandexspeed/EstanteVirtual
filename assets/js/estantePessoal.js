const client = google.accounts.oauth2.initTokenClient({
    client_id: '380330172484-a5l4ppmvnvlq48d7cumdmep189s7sv6g.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/books',
    callback: (tokenResponse) => {
        console.log("Entrou!")
        console.log(tokenResponse)
        console.log(tokenResponse.access_token);
        if (tokenResponse!=null && tokenResponse.access_token!=null) {
          
          console.log("Entrou");

            data = fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4&access_token=${tokenResponse.access_token}`).then(response => response.json());
            console.log(data);       
        }
    },
  });


  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }
  