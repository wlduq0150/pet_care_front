const onLoginLoad = () => {
    token = localStorage.getItem("accessToken");

    if (!token) {
        alert("로그인이 필요한 기능입니다!");
        return;
    }
}


const loadBooks = async () => {
    try {
        const response = await axios.get(server + "/api/books/me", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    
        const books = response.data.data;
    
        console.log(response.data);
    
        books.forEach((book) => {
            addBookToScrren(book);
        });
    } catch (err) {
        const response = err.response;

        if (response.status === 401) {
            alert("로그인이 필요합니다.");
            return;
        }
    }
}

const addBookToScrren = (book) => {
    const main = document.querySelector("main");
    const div = document.createElement("div");
    div.classList.add("reservation-box");
    div.id = book.id;

    const date_ = book.date.split("-")[0] + "년 " + book.date.split("-")[1] + "월 " + book.date.split("-")[2].slice(0,2) + "일";

    div.innerHTML=`
        <div class="profile-pic"><img src="../img/test.png"></div>
        <div class="name">${book.sitter.name}</div>
        <div class="requirements">${book.requirement}</div>
        <div class="date">${date_}</div>
        <div class="buttons">
            <button class="review" onClick="writeReview(${book.id})()">리뷰</button>
            <button class="delete" onClick="deleteBook(${book.id})()">삭제</button>
        </div>
    `

    main.appendChild(div);
}

const writeReview = (bookId) => {
    return async () => {
        const comment = prompt("리뷰 내용을 입력해주세요");
        const grade = parseInt(prompt("평점을 입력해주세요(1~5)"));
        let sitterId;

        if (grade < 1 || grade > 5) {
            alert("평점을 잘못 입력하셧습니다!");
            return;
        }

        try {
            const response = await axios.get(server + "/api/books/id/" + bookId , {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
        
            const book = response.data.data;

            sitterId = book.sitterId;
        } catch (err) {
            const response = err.response;

            if (response.status === 401) {
                alert("로그인이 필요합니다.");
                return;
            }
        }

        try {
            const response = await axios.post(server + "/reviews", {
                sitterId,
                comment,
                grade
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
    
            if (!response.data.ok) {
                alert("리뷰 작성 실패");
                return;
            }
    
            alert("리뷰 작성 완료!");
        } catch (err) {
            const response = err.response;

            if (response.status === 401) {
                alert("로그인이 필요합니다.");
                return;
            }
        }
    }
}

const deleteBook = (bookId) => {
    return async () => {
        try {
            const response = await axios.delete(server + "/api/books/" + bookId, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
    
            if (!response.data.ok) {
                alert("삭제 실패");
                return;
            }
    
            const book = document.getElementById(bookId.toString());
            book.remove();
            alert("삭제 성공");
    
            console.log(response.data);
        } catch (err) {
            const response = err.response;

            if (response.status === 401) {
                alert("로그인이 필요합니다.");
                return;
            }
        }
    }
}


window.onload = function() {
    onLoginLoad();
    loadBooks();
};
