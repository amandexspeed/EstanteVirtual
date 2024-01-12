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

// Criar uma função assíncrona que retorna uma promise
async function testarChaveAcesso() {
  // Retornar uma promise que resolve se a variável chave acesso não for indefinida
  return new Promise((resolve, reject) => {
    // Verificar se a variável chave acesso existe
    if (typeof chaveAcesso !== "undefined") {
      // Resolver a promise com o valor da variável chave acesso
      resolve(chaveAcesso);
    } else {
      // Rejeitar a promise com um erro
      reject(/* new Error("A variável chave acesso é indefinida" ) */);
    }
  });
}




async function controlFunction(){

  await testarChaveAcesso().then(contentControl()).catch(function casoErro(){
    alert("Logue para prosseguir")
    client.requestAccessToken()
    controlFunction()
  })

  /* if(chaveAcesso===undefined || chaveAcesso=="undefined"){

    client.requestAccessToken();

    if(chaveAcesso!=undefined){

        contentControl();
        
    }

  }else{

    
    contentControl();

  } */


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

async function contentControl(){

  if(chaveAcesso!=undefined){

    document.querySelectorAll(".p").forEach((e)=>e.classList.toggle("load"));
  }

}

