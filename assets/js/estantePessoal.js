async function testeGoogle(){

    const info = {

        method:'GET',
        Authorization: "380330172484-a5l4ppmvnvlq48d7cumdmep189s7sv6g.apps.googleusercontent.com"

    }

    data = await fetch("https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4",info).then(response => response.json());

}