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
        if(data.data[0].role=="sitter"){
            document.getElementById("reviewList").innerHTML="내게 쓴 리뷰들"
            data.data.map((e)=>{
                const main = document.querySelector("main");
                const reviewChild = document.createElement("div");
                reviewChild.classList.add("reservation-box");
                reviewChild.id=`${e.id}`;
                
                main.appendChild(reviewChild);
                reviewChild.innerHTML = `
            <span class="userName" id="reviewUserName">${e.userName.name} 님이 </span>
            <div class="requirements" id="reviewUserComment">${e.comment}</div>
            <span class="sitterName" id="reviewUserGrade">⭐${+e.grade}개</span>
            `;
            })

        }else{
         data.data.map((e)=>{
            const main = document.querySelector("main");
            const reviewChild = document.createElement("div");
            reviewChild.classList.add("reservation-box");
            reviewChild.id=`${e.id}`;

            main.appendChild(reviewChild);
            reviewChild.innerHTML = `
            <span class="userName" id="reviewUserName">${e.user_reviews.name}님 ></span>
            <span  class="sitterName">펫시터: ${e.sitter_reviews.name}</span>
            <div class="requirements" id="reviewUserComment">${e.comment}</div>
            <span  id="reviewUserGrade" class="sitterName">⭐${+e.grade}개</span>
            <div class="buttons">
            <button class="review" onClick="updateReview(${e.id})">수정</button>
            <button class="delete" onClick="deleteReview(${e.id})">삭제 </button>
            </div>
            `;
          
         })
        }
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

function updateReview(reviewId){
    const comment = prompt("리뷰 내용을 입력해주세요");
    const grade = parseInt(prompt("평점을 입력해주세요(1~5)"));

    if (grade < 1 || grade > 5 || isNaN(grade)) {
        alert("평점을 잘못 입력하셧습니다!");
        return;
    }

    fetch(`${server}/api/reviews/${reviewId}`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment: comment,
            grade:grade,
        }),
    })
    .then(response=>{
        console.log(response);
        
        return response.json();
    }).
    then(data =>{
        alert("수정하였습니다");
        location.reload();
    })
    .catch((err) => {
        console.log(err);
    })
}

function deleteReview(reviewId){
    const comment = prompt('정말로 삭제 하시겠습니까? 삭제하시려면 "네" 라고 써주세요');
    if(comment!="네"){
        return alert("삭제하지 않을게요");
    }
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
        location.reload();
    })
}

    getReviews();




