var chaveAcesso;

const apiKey = "AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4"

function loadingTheme(){

    let lightMode = window.matchMedia ("(prefers-color-scheme: light)");
    let theme = document.querySelector(".theme");
    if (lightMode.matches) {

        theme.classList.remove('dark');
        theme.classList.add('light');
    
    }

}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

  chaveAcesso = getUrlVars()["chA"];

var passaValor = function (pagina) {
    
    window.location = `${pagina}.html?chA=${chaveAcesso}`;

}

const client = google.accounts.oauth2.initTokenClient({
    client_id: '380330172484-a5l4ppmvnvlq48d7cumdmep189s7sv6g.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/books',
    callback: async (tokenResponse) => {
        
        if (tokenResponse!=null && tokenResponse.access_token!=null) {
          
          chaveAcesso = tokenResponse.access_token;
            
        }
    },
  });

async function controlFunction(){

  if(chaveAcesso===undefined || chaveAcesso=="undefined"){

    client.requestAccessToken()
    document.querySelectorAll(".p").forEach((e)=>e.classList.toggle("load"));
    

  }else{

    contentControl();

  }


}

async function deslogar(pasta){

    if(chaveAcesso!=undefined){

      await fetch(`https://oauth2.googleapis.com/revoke?token=${chaveAcesso}`,{

          method:"POST"

      }).then(function decide(pasta){
        
        if(pasta){window.location = `../../index.html`
        }else{window.location = `index.html`}});

      

    }


}

function contentControl(){

  if(chaveAcesso!=undefined){

    document.querySelectorAll(".p").forEach((e)=>e.classList.toggle("load"));

  }

}