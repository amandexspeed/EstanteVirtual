const key = "AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4";

/* function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
  
  // Você pode usar essa função para obter o valor do parâmetro, por exemplo:
  var variavel = getUrlVars()["chaveAcesso"];
  alert(variavel); */

async function loadData(){

    var name = document.getElementById("titulo").value;
    var author = document.getElementById("autor").value;

    console.log(name);
    console.log(author)

    var data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}+inauthor:${author}&key=${key}`).then(Response=>Response.json());

    console.log(data);

    var list = document.getElementById("lista");

    while (list.firstChild) {

        list.removeChild(list.firstChild);

    }

    console.log(data.totalItems)

    if(data.totalItems>0){

        for (var i=0;i<data.items.length;i++){

            console.log(data.items[i].id);

            var li = document.createElement("li");

            var img = document.createElement("img");

            /* if(data.items[i].volumeInfo.readingModes.image){ */ 
            if(data.items[i].volumeInfo.imageLinks!=null){ 
                
                img.src = data.items[i].volumeInfo.imageLinks.thumbnail;
                
            }
            else{

                img.src = "https://th.bing.com/th/id/OIP.hMlLJSmMJky9Rd1JwB86VgHaFl?w=244&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7";
                
            } 

            var div = document.createElement("div");
            div.setAttribute("class","boxP");

            var pTitle = document.createElement("p");
            pTitle.textContent= data.items[i].volumeInfo.title;
            pTitle.setAttribute("class","pTítulo");
            div.appendChild(pTitle);

            var pDesc = document.createElement("p");
            pDesc.setAttribute("class","pDescr");
            var text = data.items[i].volumeInfo.description;

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
                        pDesc.textContent = data.items[e.target.id].volumeInfo.description;;

                    }else{

                        e.target.textContent="Ler descrição completa";
                        var text= data.items[e.target.id].volumeInfo.description;
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

            var a = document.createElement("a");
            
            a.setAttribute("href",data.items[i].volumeInfo.infoLink);
            a.target='_blank' 
            a.rel="noopener noreferrer"
            a.textContent="Link para informações - Google livros";
            div.appendChild(a);

            var pFav = document.createElement("p");
            pFav.textContent= "Adicionar aos favoritos";
            pFav.setAttribute("class","pFav");
            pFav.setAttribute("id",i);
            pFav.addEventListener("click",e=>{

                if(chaveAcesso == null){

                    client.requestAccessToken().then(adicionaFav);
            
                }else{
            
                    carregaEstantes();
            
                }
                
            });

            div.appendChild(pFav);

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

async function adicionaFav(){

    await fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/addVolume?volumeId=${data.items[e.target.id].id}&key=${apiKey}&access_token=${chaveAcesso}`,{

                            method:"POST"

                           }).then(alert("Adicionado"));

}