const queryParams = new URLSearchParams(window.location.search);
const sitterId = queryParams.get('sitterId');

let clickBook = document.getElementById("bookThisSitter");
clickBook.addEventListener("click", () => {
    location.href = `book.html?sitterId=${sitterId}`;
})



function getSitter() {
    fetch(`${server}/api/users/${sitterId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        .then(response => {

<<<<<<< HEAD
            if (!response.ok) {
                alert("로그인이 필요한 기능입니다.");
                location.href = "signin.html";
                return;
            }
=======
        return response.json();
    }).
    then(data=>{
        document.getElementById("sitterName").innerHTML=`${data.data.name} 님`;
        document.getElementById("sitterDescription").innerHTML=`${data.data.description}`;
        console.log(data.data)
        //
        const sitterThumbnail=document.getElementById("sitterThumbnail");
       
        let sitterAverageGrade=0;
        let sitterGrade=0;

        data.data.review_for_sitters.map((el)=>{
            sitterGrade+=el.grade;
        });
        
        if(sitterGrade>=1){
             sitterAverageGrade=sitterGrade/data.data.review_for_sitters.length
        }
        else{
            sitterAverageGrade=0;
        }

        document.getElementById("averageGrade").innerHTML=`<h3>⭐${parseFloat(Math.ceil(sitterAverageGrade*100)/100).toFixed(2)}</h3>`;

        sitterThumbnail.src=data.data.thumbnail
>>>>>>> 168fd925ee3593efe60be35a01daa7e76d2c6e25

        return response.json();
    }).
    then(data=>{
        document.getElementById("sitterName").innerHTML=`${data.data.name} 님`;
        document.getElementById("sitterDescription").innerHTML=`${data.data.description}`;
        const sitterThumbnail=document.getElementById("sitterThumbnail");
       
        sitterThumbnail.src=data.data.thumbnail

            data.data.book_for_sitters.map((e) => {
                const bookParent = document.getElementById("bookedDay")
                const bookCild = document.createElement("div");
                bookCild.className = "sh-item";

                bookParent.appendChild(bookCild);

                bookCild.innerHTML = `
            <span class="name">${e.customer.name.slice(0,e.customer.name.length-1)}*</span> ${e.date.slice(0,10)}
            `;
            })

            data.data.review_for_sitters.map((e) => {
                const allSitterReviewsParent = document.getElementById("allSitterReviews");
                const newSitterReview = document.createElement("div");
                newSitterReview.className = "review-inner"
                allSitterReviewsParent.appendChild(newSitterReview);

                newSitterReview.innerHTML = `
           
            <div class="name">${e.user_reviews.name}</div>
            <div class="content">${e.comment}</div>
            <div class="star">⭐ ${e.grade}</div>
            </div>
            `

            })
        })
        .catch((err) => {
            console.log(err);
        })
}



getSitter();