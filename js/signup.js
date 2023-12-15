const imgUpload = document.querySelector('.imgUpload');
const imgUploadButton = document.querySelector('.imgUploadButton');

imgUploadButton.addEventListener('click', () => imgUpload.click());

function showImgFile(file) {
    console.log(file.value);
    console.log(file.files);
}

function checkRole(element) {
    const checkboxes = document.getElementsByName("role");

    checkboxes.forEach((cb) => {
        cb.checked = false;
    })

    element.checked = true;
}

function checkType(element) {
    const checkboxes = document.getElementsByName("type");

    checkboxes.forEach((cb) => {
        cb.checked = false;
    })

    element.checked = true;
}

const signupBox = document.getElementById("signupBox");
const signupSubmit = document.getElementById("signupSubmit");


signupSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    const userName = signupBox.name.value;
    const userEmail = signupBox.email.value;
    const userPassword = signupBox.password.value;
    const userCheckPassword = signupBox.checkPassword.value;
    const userExperience = signupBox.experience.value;
    const userDiscription = signupBox.discription.value;
    let userRole = "sitter";
    let userType = "large";

    const roleCheckSitter = document.getElementById("sitterCheck");
    const roleCheckCustomer = document.getElementById("customerCheck");
    
    if(roleCheckSitter.checked) {
        userRole = "sitter";
    }
    if(roleCheckCustomer.checked) {
        userRole = "customer";
    }

    const typeCheckLarge = document.getElementById("largeCheck");
    const typeCheckMedium = document.getElementById("mediumCheck");
    const typeCheckSmall = document.getElementById("smallCheck");

    if(typeCheckLarge.checked) {
        userType = "large";
    }
    if(typeCheckMedium.checked) {
        userType = "medium";
    }
    if(typeCheckSmall.checked) {
        userType = "small";
    }

    fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail, 
            password: userPassword,
            checkPassword: userCheckPassword,
            role: userRole,
            experience: userExperience,
            type: userType,
            discription: userDiscription
          })
    })
});