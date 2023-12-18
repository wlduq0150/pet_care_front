

function getReviews() {
    fetch(`${server}/api/reviews/`, {
            method: "GET",
        })
        .then(response => {
            return response.json();
        }).
    then(data => {
        data.data.map((e) => {
            const main = document.querySelector("main");
            const reviewChild = document.createElement("div");
            reviewChild.classList.add("reservation-box");
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

function postReview() {
    fetch("http://localhost:3000/api/reviews/", {
            method: "POST",
            body: JSON.stringify({
                sitterId: id,
                comment: comment,
                grade: grade,
            }),
        })
        .then((response) => response.json())
        .then((result) => console.log(result));
}

getReviews();

