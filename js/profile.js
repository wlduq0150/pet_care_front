const onLoginLoad = () => {
    token = localStorage.getItem("accessToken");

    if (!token) {
        alert("로그인이 필요한 기능입니다!");
        return;
    }
}

const loadUser = () => {
    // 그냥 웹에 요청해서 값을 가저옴
    return axios.get(server + "/api/users/me", { // GET /api/users/me에 요청
            headers: {
                "Authorization": `Bearer ${token}`, // headers에 token정보를 넣어 유효성 확인
            },
        })
        .then(response => {
            return response.data.data;
        });
}

const setProfile = (user) => {
    const emailField = document.getElementById("email-field"); // id에 대한 요소(태그) 불러옴
    emailField.innerHTML = `${user.email}`; // 태그 내 내용 작성
    const role = document.querySelector("article#role > svg");
    role.setAttribute(user.role, "")
    const type = document.querySelector("article#type >svg");
    type.setAttribute(user.type, "")
    const experience = document.getElementById("experience");
    experience.value = `${user.data.experience}`; // ${}
}

/** 사용자 Role 정보 변경
 * @param {HTMLButtonElement} role 사용자 요청 Role 정보
 */
const onUpdateUser = (roleName) => {
    // 요청 Body
    const body = {
        role: roleName
    };

    // 사용자 정보 변경 요청
    axios.patch(server + "/api/users/me", body, {
        headers: {
            "Authorization": `Bearer ${token}`, // headers에 token정보를 넣어 유효성 확인
        },
    });
}

// main
window.onload = async function () {
    onLoginLoad();
    const user = await loadUser();
    setProfile(user);
}