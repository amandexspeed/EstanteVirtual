const client = google.accounts.oauth2.initTokenClient({
    client_id: '380330172484-a5l4ppmvnvlq48d7cumdmep189s7sv6g.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/books',
    callback: (tokenResponse) => {
        if (tokenResponse && tokenResponse.access_token) {
          gapi.client.setApiKey('AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4');
          gapi.client.load("books","v1",function(){

            gapi.client.books.mylibrary.bookshelves

          })
          
        }
    },
  });

  client.requestAccessToken();

/* sync function testeGoogle(){

    const info = {

        method:'GET',
        Authorization: "380330172484-a5l4ppmvnvlq48d7cumdmep189s7sv6g.apps.googleusercontent.com"

    }

    data = await fetch("https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4",info).then(response => response.json());

} */