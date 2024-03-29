var select = document.getElementById("opc");

async function carregaEstantes(){

          data = await fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4&access_token=${chaveAcesso}`).then(response => response.json());
          data.items.forEach(e => {
          
            var opc = document.createElement("option");
            opc.text = e.title;
            opc.value = e.id
            select.appendChild(opc);

          });

          LerEstante();

          select.addEventListener("change",async e=>{

            LerEstante();

          })

      }

  

  async function LerEstante(){

      data = await fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${select.value}/volumes?key=AIzaSyB5ouI6UWA1W_ICu3dE-veEic1_VW-WR_4&access_token=${chaveAcesso}`).then(response => response.json());
      
      var list = document.getElementById("lista");

      while (list.firstChild) {
  
          list.removeChild(list.firstChild);
  
      }
  
      if(data.totalItems>0){
  
          for (var i=0;i<data.items.length;i++){
  
              var li = document.createElement("li");
  
              var img = document.createElement("img");
  
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

              var pInfo = document.createElement("p");

              if(text!=null){

                if(text.length>500){

                 var textSlice = text.slice(0,500);
                 pDesc.textContent = textSlice + "...";
                 div.appendChild(pDesc);

                 pInfo.textContent="Ler descrição completa";
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

              var pEst = document.createElement("p");
              pEst.textContent= "Remover da estante";
              pEst.setAttribute("class","pEst");
              pEst.setAttribute("id",i);
              pEst.addEventListener("click",async e=>{
                  
                      await fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${select.value}/removeVolume?volumeId=${data.items[e.target.id].id}&key=${apiKey}&access_token=${chaveAcesso}`,{

                              method:"POST"

                      }).then(alert("Removido"));

                      var parent = e.target.parentElement.parentElement;
                      list.removeChild(parent);
                  
              });
              div.appendChild(pEst);
  
              li.appendChild(img);
              li.appendChild(div);
              list.appendChild(li);
  
  
          } 
  
        }else{
    
      var li = document.createElement("li");
      li.textContent="A estante está vazia";
      list.appendChild(li);
      list.style.listStyle="none";

  }
}


  