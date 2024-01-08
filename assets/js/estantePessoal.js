const client = google.accounts.oauth2.initTokenClient({
    client_id: '380330172484-a5l4ppmvnvlq48d7cumdmep189s7sv6g.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/books',
    callback: (tokenResponse) => {
        console.log("Entrou!")
        console.log(tokenResponse)
        console.log(tokenResponse.access_token);
        if (tokenResponse!=null && tokenResponse.access_token!=null) {
         
         /*  console.log("Entrou!")
          gapi.client.setApiKey('AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4');
          gapi.client.load("books","v1",function(){*/
          
          console.log("Entrou");
             
            const info = {

                method:'GET',
                Authorization: `Bearer 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`
        
            }

            console.log("Setou")

            data = fetch("https://www.googleapis.com/books/v1/mylibrary/bookshelves",info).then(response => response.json());
            /* ?key=AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4  */
            console.log("Chamou API")
            console.log(data);

          /* }) */
          
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