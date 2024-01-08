var chaveAcesso = 0;
const apiKey = "AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4"

function loadingTheme(){

    let lightMode = window.matchMedia ("(prefers-color-scheme: light)");
    let theme = document.querySelector(".theme");
    if (lightMode.matches) {

        theme.classList.remove('dark');
        theme.classList.add('light');
    
    }

}

var passaValor = function (pagina) {

    
    window.location = `${pagina}.html?chaveAcesso=${chaveAcesso}`;

}