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

  function TestarChave() {
    return new Promise((chaveAcesso)=>{
      
       this.chaveAcesso;

      if(this.chaveAcesso===undefined || chaveAcesso=="undefined"){

        chaveAcesso =  false;

      }else{

        chaveAcesso = true

      }

    });
  }


async function controlFunction(){

  var teste = await TestarChave().then(console.log());

  console.log(teste);

  if(chaveAcesso===undefined || chaveAcesso=="undefined"){

    client.requestAccessToken();

    if(chaveAcesso!=undefined){

        contentControl();
        
    }



    

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
        }else{client.requestAccessToken()}});

      

    }


}

function contentControl(){


  if(chaveAcesso!=undefined){

    document.querySelectorAll(".p").forEach((e)=>e.classList.toggle("load"));
  }

}

