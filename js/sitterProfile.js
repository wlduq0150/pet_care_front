const queryParams = new URLSearchParams(window.location.search);
const sitterId = queryParams.get('sitterId');

let clickBook =document.getElementById("bookThisSitter");
clickBook.addEventListener("click",()=>{
    location.href=`book.html?sitterId=${sitterId}`;
})



function getSitter(){
    fetch(`${server}/api/users/${sitterId}`,{
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
        const sitterThumbnail=document.getElementById("sitterThumbnail");
       
        sitterThumbnail.src=data.data.thumbnail

        data.data.book_for_sitters.map((e)=>{
            const bookParent= document.getElementById("bookedDay")
            const bookCild =document.createElement("div");
            bookCild.className="sh-item";

            bookParent.appendChild(bookCild);

            bookCild.innerHTML=`
            <span class="name">${e.customer.name.slice(0,e.customer.name.length-1)}*</span> ${e.date.slice(0,10)}
            `
        })
        
        data.data.review_for_sitters.map((e)=>{
            const allSitterReviewsParent =document.getElementById("allSitterReviews");
            const newSitterReview= document.createElement("div");
            newSitterReview.className="review-inner"
            allSitterReviewsParent.appendChild(newSitterReview);

            newSitterReview.innerHTML=`
           
            <div class="name">${e.user_reviews.name}</div>
            <div class="content">${e.comment}</div>
            <div class="star">⭐ ${e.grade}</div>
            </div>
            `
/*
  <div class="review-inner">
                                <div class="name">이민정</div>
                                <div class="content">너무 좋고 시간 잘 맞춰서 와주셨고 아이가 너무 좋아했습니다!</div>
                                <div class="star">⭐ 4.5</div>
                            </div>
*/

        })

    })
}



getSitter();