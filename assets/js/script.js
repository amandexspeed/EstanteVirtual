var chaveAcesso;

const apiKey = "AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4"

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    return vars;
}

chaveAcesso = getUrlVars()["chA"];
var tema = getUrlVars()["theme"];


function loadingTheme(){

  if(tema=="undefined"){
    let lightMode = window.matchMedia ("(prefers-color-scheme: light)");
    let theme = document.querySelector(".theme");
    if (lightMode.matches) {

        theme.classList.remove('dark');
        theme.classList.add('light');
    
    }
  }else{

    if(tema == "light"){

      theme.classList.remove('dark');
      theme.classList.add('light');

    }

  }

}

var passaValor = function (pagina) {
    
    const body = document.querySelector(".theme"); 
    if(body.classList.contains("light")){

      tema = "light"

    }else{

      tema = "dark"

    }

    window.location = `${pagina}.html?chA=${chaveAcesso}&theme=${tema}`;

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
    if (typeof chaveAcesso !== "undefined" && chaveAcesso != "undefined") {
      resolve(chaveAcesso);
    } else {
      reject(
        alert("Logue para prosseguir"),
        client.requestAccessToken()
      );
    }
  });
}

async function ValidaAcessoPágina(pagina) {
  return new Promise((resolve, reject) => {

    if (typeof chaveAcesso !== "undefined") {

      resolve(passaValor(pagina));

    } else {
      reject(
        alert("Logue para prosseguir"),
        client.requestAccessToken()
      );
    }
  });
}


async function contentControl(){

    await testarChaveAcesso().then(document.querySelectorAll(".p").forEach((e)=>e.classList.toggle("load"))).catch()

    
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

  var TriggerTheme = document.querySelectorAll('.triggerTheme')

  TriggerTheme.forEach((trigger)=>{
    trigger.addEventListener('click',(e)=>{

        let body = document.querySelector("body");

        let theme = document.querySelector(".theme");

        theme.classList.toggle('dark');
        theme.classList.toggle('light');

    })
})