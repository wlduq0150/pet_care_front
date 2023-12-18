
let reviewServer="http://localhost:3000/api/users/"

function getSitterList(){
    fetch(`${server}/api/users/`,{
        method: "GET",
    })
    .then(response=>{
        return response.json();
    }).
    then(data=>{
        data.data.map((e) => {
            let sitterGrade=0;

            e.review_for_sitters.map((el)=>{
                sitterGrade+=el.grade;
            });
            
            if(sitterGrade>=1){
                e.sitterAverageGrade=sitterGrade/e.review_for_sitters.length
            }
            else{
                e.sitterAverageGrade=0;
            }
        });

        data.data.sort((a,b) => {
            return b.sitterAverageGrade - a.sitterAverageGrade
        });

        data.data.map((e)=>{
            if(e.role=="sitter"){
                let sitterListParent= document.getElementById("sitterListP")
                let sitterChild =document.createElement("div");    
                
                // e.review_for_sitters.map((el)=>{
                //     sitterGrade+=el.grade;
                // });
                
                // if(sitterGrade>=1){
                //      sitterAverageGrade=sitterGrade/e.review_for_sitters.length
                // }
                // else{
                //     sitterAverageGrade=0;
                // }

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
                            <h2>${e.description}</h2>
                        </div>
                        <div id="info">
                            <div><img src="../img/pet.svg">${e.experience}</div>
                            <div><img src="../img/star.svg">${e.sitterAverageGrade}</div>
                        </div>
                    </section>
                </article>
                `

            }
        })
    })
    .catch((e)=>{
        console.log(e);
    })
}

function movePage(id){
    location.href=`review.html?sitterId=${id}`;
    
}

getMyInformation();

getSitterList();

