

let token;
token = localStorage.getItem("accessToken");

function getSitterList(){
    fetch("http://localhost:3000/api/users/",{
        method: "GET",
        headers: {//로그인마다 바꿔줘야함
            "Authorization": `Bearer ${token}`,
          },
    })
    .then(response=>{
        return response.json();
    }).
    then(data=>{
        data.data.map((e)=>{
            if(e.role=="sitter"){
                let sitterListParent= document.getElementById("sitterListP")
                let sitterChild =document.createElement("div");
                sitterListParent.appendChild(sitterChild);
                sitterChild.innerHTML=`
                <article>
                    <section id="profile">
                        <img src="../img/test.png">
                    </section>
                    <section id="description">
                        <div id="user">
                            <h1>${e.name}</h1>
                            <h2>~대충 시터설명~</h2>
                        </div>
                        <div id="info">
                            <div><img src="../img/pet.svg">${e.experience}</div>
                            <div><img src="../img/star.svg">평점</div>
                        </div>
                    </section>
                </article>
                `
            }
           
        })
    })
    .catch(()=>{
       
    })
}





getMyInformation();

getSitterList();

