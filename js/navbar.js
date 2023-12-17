let n = document.querySelector("nav");
n.setAttribute("class", "hidden");

document.querySelector("#menu").addEventListener("click", () => {
    if (n.getAttribute("class") === "hidden") {
        n.setAttribute("class", "visible");
    } else {
        n.setAttribute("class", "hidden");
    }
});


let token;
token = localStorage.getItem("accessToken");

let logOut =document.getElementById("sitterListPageLogOut");
logOut.addEventListener("click",()=>{
    localStorage.removeItem("accessToken");
    window.onload();
})

function getMyInformation(){
    fetch("http://localhost:3000/api/users/me",{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
          },
    })
    .then(response=>{
        return response.json();
    })
    .then(data=>{
    yesSiginin();
   
    })
    .catch(()=>{
        notSingin();
    })
}

function yesSiginin(){
    document.getElementById("sitterListPageLogOut").style.display="block";
    document.getElementById("sitterListPageSignUp").style.display="none";
    document.getElementById("sitterListPageSignIn").style.display="none";
    document.getElementById("sitterListPageBook").style.display="block";
    document.getElementById("sitterListPageReview").style.display="block";
    console.log("로그인됨");
}

function notSingin(){
    document.getElementById("sitterListPageLogOut").style.display="none";
    document.getElementById("sitterListPageSignUp").style.display="block";
    document.getElementById("sitterListPageSignIn").style.display="block";
    document.getElementById("sitterListPageBook").style.display="none";
    document.getElementById("sitterListPageReview").style.display="none";
    alert("로그인 안됨");
    location.href="signin.html";
}


getMyInformation();
