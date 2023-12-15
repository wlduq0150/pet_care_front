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
       // console.log(data.data.length);
        data.data.map((e)=>{
           // for(let i=0;i<data.data.lenthg;i++)
            if(e.role=="sitter"){
                let sitterListParent= document.getElementById("sitterListP")
                let sitterChild =document.createElement("div");
                let sitterGrade=0;
                let sitterAverageGrade;
                
                e.review_for_sitters.map((el)=>{
                   // console.log(el.grade);
                    sitterGrade+=el.grade;
                });
                
                if(sitterGrade>=1){
                   // console.log(sitterGrade);
                     sitterAverageGrade=sitterGrade/e.review_for_sitters.length
                }
                else{
                    sitterAverageGrade="리뷰없음"
                }

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
                            <div><img src="../img/star.svg">${sitterAverageGrade}</div>
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

