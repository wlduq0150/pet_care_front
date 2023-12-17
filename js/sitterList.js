
let reviewServer="http://localhost:3000/api/users/"

function getSitterList(){
    fetch(reviewServer,{
        method: "GET",
        headers: {
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
                let sitterGrade=0;
                let sitterAverageGrade;
                
                e.review_for_sitters.map((el)=>{
                    sitterGrade+=el.grade;
                });
                
                if(sitterGrade>=1){
                     sitterAverageGrade=sitterGrade/e.review_for_sitters.length
                }
                else{
                    sitterAverageGrade=0;
                }

                sitterListParent.appendChild(sitterChild);

                //아마 39번째 줄(이미지 업로드 부분) 추후에 바꿔야 할듯
                sitterChild.innerHTML=`
                <article onclick="movePage(${e.id})">
                    <section id="profile">
                        <img src=${e.thumbnail} id=sitterImg> 
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

function movePage(id){
    location.href=`review.html?sitterId=${id}`;
    
}

getMyInformation();

getSitterList();

