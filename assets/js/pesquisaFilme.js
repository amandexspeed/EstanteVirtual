const key = "f7b894bff44fb2729cd01bacffb56c0e";

async function loadData(){

    var name = document.getElementById("titulo").value;
    var list = document.getElementById("lista");

    var data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&language=pt-BR&api_key=${key}`).then(Response=>Response.json());

    while (list.firstChild) {

        list.removeChild(list.firstChild);

    }

    if(data.total_results>0){

        for (var i=0;i<data.results.length;i++){

            var li = document.createElement("li");

           var img = document.createElement("img");

           
            if(data.results[i].backdrop_path!=null){ 
                
                var path = (`https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`);
                img.src = path;
                
            }
            else{

                img.src = "https://th.bing.com/th/id/OIP.hMlLJSmMJky9Rd1JwB86VgHaFl?w=244&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7";
                
            }  

            var div = document.createElement("div");
            div.setAttribute("class","boxP");

            var pTitle = document.createElement("p");
            pTitle.textContent= data.results[i].title;
            pTitle.setAttribute("class","pTítulo");
            div.appendChild(pTitle);

            var pDesc = document.createElement("p");
            pDesc.setAttribute("class","pDescr");
            var text = data.results[i].overview;

            if(text!=null){
                if(text.length>500){

                 var textSlice = text.slice(0,500);
                 pDesc.textContent = textSlice + "...";
                 var pInfo = document.createElement("p");
                 pInfo.textContent="Ler descrição completa"
                 pInfo.setAttribute("class","info menos");
                 pInfo.setAttribute("id",i);

                 pInfo.addEventListener("click",e=>{

                 const div = e.target.parentElement;
                 const pDesc = div.querySelector(".pDescr");   
                 
                   if(e.target.classList.contains("menos")){

                        e.target.textContent ="Menos informações";
                        pDesc.textContent = data.results[e.target.id].overview;

                    }else{

                        e.target.textContent="Ler descrição completa";
                        var text= data.results[e.target.id].overview;
                        text = text.slice(0,500);
                        pDesc.textContent = text + "...";

                    }

                    e.target.classList.toggle("menos");
                    e.target.classList.toggle("mais");
 
                 });

                 div.appendChild(pDesc);
                 div.appendChild(pInfo);
                 
                }else{

                    pDesc.textContent=text;
                    div.appendChild(pDesc);

                }
            }

             li.appendChild(img); 
            li.appendChild(div);
            list.appendChild(li);


        }  

    }else{

        var li = document.createElement("li");
        li.textContent="Não achamos nada";
        list.appendChild(li);
        list.style.listStyle="none";

    }

}

document.getElementById('titulo').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        loadData();
    }
});