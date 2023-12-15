function getMyInformation(){
    fetch(" http://localhost:3000/api/users/me",{
        method: "GET",
        headers: {
           // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDI2MDQyMjgsImV4cCI6MTcwMjYxMTQyOH0.O1fWsYDESrdo6J380rWQrSnprKxFEyjB_DkIgxwWpWQ",
          },
    })
    .then(response=>{
        yesSiginin();//로그인 됬다는 함수 호출
        document.getElementById("sitterListPageSignUp").style.display="none";
        document.getElementById("sitterListPageSignIn").style.display="none";
        document.getElementById("sitterListPageBook").style.display="block";
        document.getElementById("sitterListPageReview").style.display="block";
        return response.json();
    })
    .then(data=>{
    
    console.log(data.data.name);
   
    })
    .catch(()=>{
        document.getElementById("sitterListPageSignUp").style.display="block";
        document.getElementById("sitterListPageSignIn").style.display="block";
        document.getElementById("sitterListPageBook").style.display="none";
        document.getElementById("sitterListPageReview").style.display="none";
        notSingin();
       
    })
}

function getSitterList(){
    fetch(" http://localhost:3000/api/users/",{
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE3MDI2MDQyMjgsImV4cCI6MTcwMjYxMTQyOH0.O1fWsYDESrdo6J380rWQrSnprKxFEyjB_DkIgxwWpWQ",
          },
    })
    .then(response=>{
        return response.json();
    }).
    then(data=>{
        data.data.map((e)=>{
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
        })
    })
    .catch(()=>{
       
    })
}



function notSingin(){
    console.log("로그인 안됨");
}

function yesSiginin(){
    console.log("로그인됨");
}

getMyInformation();

getSitterList();

