const onLoginLoad = () => {
    token = localStorage.getItem("accessToken");

    if (!token) {
        alert("로그인이 필요한 기능입니다!");
        return;
    }
}

const loadUser = () => {
    // 그냥 웹에 요청해서 값을 가저옴
    return fetch("http://localhost:3000/api/users/me", { // GET /api/users/me에 요청
            method: "GET", // GET / POST
            headers: {
                "Authorization": `Bearer ${token}`, // headers에 token정보를 넣어 유효성 확인
            },
        })
        .then(response => {
            return response.json();
        });
}

const setProfile = (user) => {
    const emailField = document.getElementById("email-field"); // id에 대한 요소(태그) 불러옴
    emailField.innerHTML = `${user.data.email}`; // 태그 내 내용 작성
    const role = document.querySelector("article#role > svg");
    role.setAttribute(user.data.role, "")
    const type = document.querySelector("article#type >svg");
    type.setAttribute(user.data.type, "")
    const experience = document.getElementById("experience");
    experience.value = `${user.data.experience}`; // ${}
}

/** 사용자 Role 정보 변경
 * @param {HTMLButtonElement} role 사용자 요청 Role 정보
 */
const onRole = (roleName) => {  
    console.log("제발 되어라", roleName );
    fetch("http://localhost:3000/api/users/me", {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`, // headers에 token정보를 넣어 유효성 확인
        },
        body: JSON.stringify({
            role: roleName,
        }),
    })
}


// main
window.onload = async function () {
    onLoginLoad();
    const user = await loadUser();
    setProfile(user);
}