const client = google.accounts.oauth2.initTokenClient({
    client_id: '380330172484-a5l4ppmvnvlq48d7cumdmep189s7sv6g.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/books',
    callback: async (tokenResponse) => {
        console.log("Entrou!")
        console.log(tokenResponse)
        console.log(tokenResponse.access_token);
        if (tokenResponse!=null && tokenResponse.access_token!=null) {
          
          console.log("Entrou");

            data = await fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4&access_token=${tokenResponse.access_token}`).then(response => response.json());
            console.log(data); 

            var select = document.getElementById("opc");

            data.items.forEach(e => {
              
              console.log(e)
              var opc = document.createElement("option");
              opc.text = e.title;
              opc.value = e.id
              select.appendChild(opc);

            });

            select.addEventListener("change",async e=>{

              volumes = await fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/shelf/volumes?key=AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4&access_token=${tokenResponse.access_token}`).then(response => response.json());

            })
            
            
        }
    },
  });


  