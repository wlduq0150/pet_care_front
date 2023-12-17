//내가 쓴 리뷰 목록 (리뷰 전체보기 페이지)
const queryParams = new URLSearchParams(window.location.search);
const myId = queryParams.get('myId');


function getReviews(){
    fetch(`${server}/api/reviews/myReviews`,{
         method: "GET",
         headers: {
            "Authorization": `Bearer ${token}`,
          },
     })
     .then(response=>{
         return response.json();
     }).
     then(data =>{
        
         data.data.map((e)=>{
            const main = document.querySelector("main");
            const reviewChild = document.createElement("div");
            reviewChild.classList.add("reservation-box");
            reviewChild.id=`${e.id}`;

            main.appendChild(reviewChild);
            reviewChild.innerHTML = `
            
            <span class="userName" id="reviewUserName">${e.user_reviews.name}님 ></span>
            <span  id="reviewUserGrade">⭐${+e.grade}개</span>
            <div class="requirements" id="reviewUserComment">${e.comment}</div>
            <div class="sitterName" >펫시터: ${e.sitter_reviews.name}</div>
              <div class="buttons">
            <button class="review" onClick="updateReview(${e.id})">수정</button>
            <button class="delete" onClick="deleteReview(${e.id})">삭제 </button>
            </div>
            `;
          
         })
     });
  }

 function postReview(){
     fetch("http://localhost:3000/api/reviews/",{
         method:"POST",
         body: JSON.stringify({
             sitterId: id,
             comment: comment,
             grade:grade,
         }),
     })
     .then((response) => response.json())
     .then((result) => console.log(result));
 }
/*
const updateReview= (reviewId)=>{
    return async ()=>{
        try{
            const response= await axios.put(server+"api/reviews/"+reviewId,{
                headers: {
                    "Authorization": `Bearer ${token}`,
                  },
                  body:{
                    userId:3,
                    comment:"싫어요",
                    grade:4,
                  },
            });

            return response.data;
        }catch(err){
            const response = err.response;

            if (response.status === 401) {
                alert("로그인이 필요합니다.");
                return;
            }
        }
    }
}
*/
function updateReview(reviewId){
    fetch(`${server}/api/reviews/${reviewId}`,{
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            //userId: 3,
            comment: "싫어요",
            grade:5,
        }),
    })
    .then(response=>{
        console.log(response);
        
        return response.json();
    }).
    then(data =>{

        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
}

function deleteReview(reviewId){
    fetch(`${server}/api/reviews/${reviewId}`,{
        method:"DELETE",
        headers:{
            "Authorization": `Bearer ${token}`,
        },
    })
    .then(response=>{
        return response.json();
    })
    .then(data=>{
        console.log(data);
    })
}


 getReviews();

