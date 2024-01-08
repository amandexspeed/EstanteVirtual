const client = google.accounts.oauth2.initTokenClient({
    client_id: '380330172484-a5l4ppmvnvlq48d7cumdmep189s7sv6g.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/books',
    callback: (tokenResponse) => {
        console.log("Entrou!")
        console.log(tokenResponse)
        if (tokenResponse && tokenResponse.access_token) {
          gapi.client.setApiKey('AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4');
          console.log(tokenResponse.access_token);
          gapi.client.load("books","v1",function(){

            const info = {

                method:'GET',
                Authorization: tokenResponse.access_token
        
            }

            data = fetch("https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4",info).then(response => response.json());

            console.log(data);

          })
          
        }
    },
  });

  

/* sync function testeGoogle(){

    const info = {

        method:'GET',
        Authorization: "380330172484-a5l4ppmvnvlq48d7cumdmep189s7sv6g.apps.googleusercontent.com"

    }

    data = await fetch("https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4",info).then(response => response.json());

} */