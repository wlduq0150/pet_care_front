const signinDataBox = document.getElementById("signinDataBox");
const signinButton = document.getElementById("signinButton");

signinButton.addEventListener("click", (event) => {
    event.preventDefault();
    const userEmail = signinDataBox.email.value;
    const userPassword = signinDataBox.password.value;

    fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    })

    .then((res) => res.json())
    .then((data) => console.log(data))
});