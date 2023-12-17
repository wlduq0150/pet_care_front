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



signupSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
    const userName = document.getElementById("nameField").value;
    const userEmail = document.getElementById("emailField").value;
    const userPassword = document.getElementById("passwordField").value;
    const userCheckPassword = document.getElementById("passwordCheckField").value;
    const userExperience = document.getElementById("experienceField").value;
    const userDiscription = document.getElementById("discriptionField").value;
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

    const formData = new FormData();
    const imagefile = document.querySelector(".imgUpload");
    formData.append("thumbnail", imagefile.files[0]);
    let userThumbnail;

    try {
        const response = await fetch(server + "/api/image/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            alert("이미지 업로드 실패")
        }

        const data = await response.json();
        
        userThumbnail = data.data.image;
    } catch (err) {
        alert("이미지 업로드 실패");
        return;
    }

    const body =  {
        name: userName,
        email: userEmail, 
        password: userPassword,
        checkPassword: userCheckPassword,
        role: userRole,
        experience: userExperience,
        type: userType,
        discription: userDiscription,
        thumbnail: userThumbnail
    };

    try {
        const response = await fetch(server + "/api/auth/signup", {
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
                discription: userDiscription,
                thumbnail: userThumbnail
            })
        });

        const data = await response.json();

        alert("회원가입 성공");
    } catch (err) {
        alert("회원가입 실패");
        return;
    }
});