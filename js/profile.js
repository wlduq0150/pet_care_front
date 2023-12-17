const onLoginLoad = () => {
    token = localStorage.getItem("accessToken");

    if (!token) {
        alert("로그인이 필요한 기능입니다!");
        return;
    }
}

const loadUser = async () => {
    const response = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: { //로그인마다 바꿔줘야함
            "Authorization": `Bearer ${token}`,
        },
    })
    .then(response => {
        return response.json();
    });
    
    console.log(response.data); // 출력

}

// main
window.onload = function () {
    onLoginLoad();
    loadUser();
};