let token;

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

    div.innerHTML=`
        <div class="profile-pic"></div>
        <div class="name">${book.sitter.name}</div>
        <div class="requirements">${book.requirement}</div>
        <div class="date">${book.date.slice(0, 10)}</div>
        <div class="buttons">
            <button class="review">리뷰</button>
            <button class="delete" onClick="deleteBook(${book.id})()">삭제</button>
        </div>
    `

    main.appendChild(div);
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
