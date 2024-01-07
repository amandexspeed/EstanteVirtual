const key = "f7b894bff44fb2729cd01bacffb56c0e";

async function loadData(){

    var data = await fetch(`https://api.themoviedb.org/3/movie?query=Batman/550?api_key=${key}`).then(Response=>Response.json());
    console.log(data)

}