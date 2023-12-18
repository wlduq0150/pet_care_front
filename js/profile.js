const onLoginLoad = () => {
    token = localStorage.getItem("accessToken");

    if (!token) {
        return;
    }
}

const loadUser = async () => {
    try {
        const response = await axios.get(server + "/api/users/me", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const user = response.data.data;

        console.log(user);

        setProfile(user);
    } catch (err) {
        const response = err.response;

        if (!response) {
            console.log(err);
            return;
        }

        if (response.status === 401) {
            alert("로그인이 필요합니다.");
            location.href = "signin.html";
            return;
        }
    }
}

const setProfile = (user) => {
    const profileImg = document.querySelector(".profile_img");
    profileImg.src = user?.thumbnail;
    const profileName = document.querySelector(".profile_name");
    profileName.textContent = user?.name;
    const emailField = document.getElementById("email-field"); // id에 대한 요소(태그) 불러옴
    emailField.innerHTML = `${user.email}`; // 태그 내 내용 작성
    const role = document.querySelector("article#role > svg");
    role.setAttribute(user.role, "")
    const type = document.querySelector("article#type > svg");
    const typeTS = { "large": "b", "medium": "m", "small": "s" };
    type.removeAttribute("b");
    const type_ = typeTS[user.type];
    console.log(type_);
    type.setAttribute(type_, "");
    const experience = document.querySelector(".experience");
    experience.value = `${user.experience}`; // ${}

    if (user.role === "customer") {
        document.getElementById("type").style.display = "none";
        document.getElementById("experience").style.display = "none";
    }

    const introduce = document.querySelector(".profile_introduce");
    introduce.value = user.description;
}

/** 사용자 Role 정보 변경
 * @param {HTMLButtonElement} role 사용자 요청 Role 정보
 */
const onRole = (roleName) => {  
    // console.log("제발 되어라", roleName );
    // fetch("http://localhost:3000/api/users/me", {
    //     method: "PATCH",
    //     headers: {
    //         "Authorization": `Bearer ${token}`, // headers에 token정보를 넣어 유효성 확인
    //     },
    //     body: JSON.stringify({
    //         role: roleName,
    //     }),
    // })
}

document.querySelector(".delete").addEventListener("click", async (e) => {
    try {
        const cont = prompt("정말 회원 탈퇴를 하시겠습니까? 맞다면 '네'를 입력해주세요");
        if (cont !== "네") {
            alert("회원 탈퇴를 취소합니다");
            return;
        }

        const response = await axios.delete(server + "/api/users/me", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        const result = response.data;

        console.log(result);

        if (!result.ok) {
            alert("회원탈퇴 실패");
            return;
        }

        alert("회원탈퇴 성공");
        localStorage.clear();
        location.href = "sitterList.html";
    } catch (err) {
        const response = err.response;

        if (!response) {
            console.log(err);
            alert("회원탈퇴 실패");
            return;
        }

        if (response.status === 401) {
            alert("로그인이 필요합니다.");
            location.href = "signin.html";
            return;
        }
    }
})

// main
window.onload = function () {
    onLoginLoad();
    loadUser();
}