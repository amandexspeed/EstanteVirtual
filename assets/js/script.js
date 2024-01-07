function loadingTheme(){

    let lightMode = window.matchMedia ("(prefers-color-scheme: light)");
    let theme = document.querySelector(".theme");

    if (lightMode.matches) {

        theme.classList.remove('dark');
        theme.classList.add('light');
    
    }

}