let getSitterServer="http://localhost:3000/api/users/"

const queryParams = new URLSearchParams(window.location.search);
const sitterId = queryParams.get('sitterId');

let clickBook =document.getElementById("bookThisSitter");
clickBook.addEventListener("click",()=>{
    location.href=`book.html?sitterId=${sitterId}`;
})



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
            <td>${e.date.slice(0,10)}</td>
            </tr>
            `
        })
        
        data.data.review_for_sitters.map((e)=>{
            const allSitterReviewsParent =document.getElementById("allSitterReviews");
            const newSitterReview= document.createElement("tr");
            allSitterReviewsParent.appendChild(newSitterReview);

            newSitterReview.innerHTML=`
            <tr>
                <td>${e.user_reviews.name}</td>
                <td>${e.comment}</td>
                <td>${e.grade}</td>
            </tr>
            `
        })

    })
}



getSitter();