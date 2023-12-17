let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let selectedDate;
let curSitter;


const onLoginLoad = () => {
    token = localStorage.getItem("accessToken");

    if (!token) {
        alert("로그인이 필요한 기능입니다!");
        location.href="signin.html";
        return;
    }

    return true;
}



/////////////////////////////////////
//달력
/////////////////////////////////////

function createCalendar(year, month) {
    let calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0);
    let daysInMonth = lastDay.getDate();
    let startingDay = firstDay.getDay();

    let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let header = calendar.createTHead();
    let row = header.insertRow();
    for (let i = 0; i < 7; i++) {
        let cell = row.insertCell();
        cell.innerHTML = weekdays[i];
    }

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = calendar.insertRow();
        for (let j = 0; j < 7; j++) {
            let cell = row.insertCell();
            if (i === 0 && j < startingDay) {
                cell.innerHTML = '';
            } else if (date > daysInMonth) {
                cell.innerHTML = '';
            } else {
                cell.innerHTML = '<a class="date_span" href="#" onclick="showDate(\'' + year + '-' + (month + 1) + '-' + date + '\')">' + '<span>' + date + '</span>' + '</a>';
                date++;
            }
        }
    }

    let cells = document.querySelectorAll('#calendar td a');
    cells.forEach(function(cell) {
        cell.addEventListener('click', function(event) {
            event.preventDefault(); // 링크의 기본 동작 방지
            let selectedCells = document.querySelectorAll('#calendar td a.selected');
            selectedCells.forEach(function(selectedCell) {
                selectedCell.classList.remove('selected');
            });
            cell.classList.add('selected');
        });
    });

    // 달력 위에 현재 년도와 달 표시
    document.getElementById('navLabel').innerHTML = year + '년 ' + (month + 1) + '월';
}

function showDate(date) {
    selectedDate = date;
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    createCalendar(currentYear, currentMonth);
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    createCalendar(currentYear, currentMonth);
}

/////////////////////////////////////
//펫시터 정보 불러오기
/////////////////////////////////////

const loadSitter = async () => {
    try {
        const queryParams = new URLSearchParams(window.location.search);
        const sitterId = queryParams.get('sitterId');
        
        const response = await axios.get(server + "/api/users/" + sitterId, {
            headers: {
                authorization: "Bearer " + token
            }
        });

        const sitter = response.data.data;
        
        if (!sitter) {
            alert("예약할 수 없는 펫시터입니다.");
            return;
        }

        curSitter = sitter.id;
        console.log(response.data);
    } catch (err) {
        console.log(err);
        const response = err.response;

        if (!response) {
            alert("네트워크 에러");
            return;
        }

        if (response.status === 401) {
            // alert("로그인이 필요합니다.");
            location.href="signin.html";
            return;
        }
    }
}

/////////////////////////////////////
//예약하기
/////////////////////////////////////

const onBook = async () => {
    try {
        const requireText = document.getElementById('requirements').value;

        if (!selectedDate) {
            alert("날짜를 선택해주세요!");
            return;
        }

        const response = await axios.post(server + "/api/books", {
            sitterId: curSitter,
            requirement: requireText || "",
            date: selectedDate
        }, {
            headers: {
                authorization: "Bearer " + token
            }
        });

        console.log(response.data.data);

        if (!response.data.ok) {
            alert("예약 실패");
            return;
        }

        alert("예약 성공");
        location.href = "book-list.html";
        
    } catch (err) {
        const response = err.response;

        if (!response) {
            alert("네트워크 에러");
            return;
        }

        if (response.status === 401) {
            alert("로그인이 필요합니다.");
            location.href="signin.html";
            return;
        }
    }
}

window.onload = function() {
    createCalendar(currentYear, currentMonth);
    const result = onLoginLoad();
    if (result) loadSitter();
};

