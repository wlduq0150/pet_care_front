const signinDataBox = document.getElementById("signinDataBox");
const signinButton = document.getElementById("signinButton");

signinButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const userEmail = signinDataBox.email.value;
    const userPassword = signinDataBox.password.value;

    try {
        const response = await fetch("http://localhost:3000/api/auth/signin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        localStorage.setItem("accessToken", data.accessToken.split(" ")[1]);
        alert("로그인 성공");
        location.href = "sitterList.html";
    } catch (err) {
        console.log(err);
        alert("로그인 실패");
    }
});