/*
특정시터의 id로 시터검색
name
email
pssword 필요없음
thumbnail
description
role
experience
review_for_sitters[].grade
book_for_sitters[].date

그 시터 id의 리뷰 조회
리뷰에서 사용자 이름 리뷰내용:comment 평점:grade

id가 bookedDay에 자식객체 생성
자식객체에 book배열로 innerHTML



*/
let getSitterServer="http://localhost:3000/api/users/"

const queryParams = new URLSearchParams(window.location.search);
const sitterId = queryParams.get('sitterId');


console.log(sitterId);


function getSitter(){
    fetch(`${getSitterServer}${sitterId}`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
          },
    })
    .then(response=>{
        return response.json();
    }).
    then(data=>{
        document.getElementById("sitterName").innerHTML=`${data.data.name} 님`;
        document.getElementById("sitterDescription").innerHTML=`${data.data.description}`;
        document.getElementById("sitterThumbnail").innerHTML=`<img src=${data.data.thumbnail}>`
       
        data.data.book_for_sitters.map((e)=>{
            const bookParent= document.getElementById("bookedDay")
            const bookCild =document.createElement("tr");
            bookParent.appendChild(bookCild);

            bookCild.innerHTML=`
            <tr>
            <td>${e.date}</td>
            </tr>
            `
        })

        data.data.review_for_sitters.map((e)=>{
            const allSitterReviewsParent =document.getElementById("allSitterReviews");
            const newSitterReview= document.createElement("tr");
            allSitterReviewsParent.appendChild(newSitterReview);


            newSitterReview.innerHTML=`
            <tr>
                <td>${e.userId}</td>
                <td>${e.comment}</td>
                <td>${e.grade}</td>
            </tr>
            `
        })
    
    })
}

function getUserName(){
    
}

getSitter();