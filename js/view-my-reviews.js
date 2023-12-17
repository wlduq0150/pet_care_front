//리뷰 목록 (리뷰 전체보기 페이지)

function getReviews(){
    fetch(`${server}/api/reviews/`,{
         method: "GET",
     })
     .then(response=>{
         return response.json();
     }).
     then(data =>{
         data.data.map((e)=>{
            const main = document.querySelector("main");
            const reviewChild = document.createElement("div");
            reviewChild.classList.add("reservation-box");
          //  let reviswsParent=document.getElementById("reviswsParent");
          //  let newChildElement = document.createElement("div");
            main.appendChild(reviewChild);
            reviewChild.innerHTML = `
            
            <span class="userName" id="reviewUserName">${e.userName}님 ></span>
            <span  id="reviewUserGrade">⭐${+e.grade}개</span>
            <div class="requirements" id="reviewUserComment">${e.comment}</div>
            <div class="sitterName" >펫시터: ${e.sitterName}</div>
          
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
 
 getReviews();

/*
 div.innerHTML=`
        <div class="profile-pic"><img src="../img/test.png"></div>
        <div class="name">${book.sitter.name}</div>
        <div class="requirements">${book.requirement}</div>
        <div class="date">${date_}</div>
        <div class="buttons">
            <button class="review">리뷰</button>
            <button class="delete" onClick="deleteBook(${book.id})()">삭제</button>
        </div>
    `
*/

/*
  <div class="buttons">
            <button class="review">리뷰</button>
            <button class="delete" onClick="deleteBook(${book.id})()">삭제</button>
        </div>
*/