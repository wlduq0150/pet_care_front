function showImgFile(file) {
    console.log(file.value);
    console.log(file.files);
}

function checkRole(element) {
    const checkboxes = document.getElementsByName("role");
    let userRole = "sitter";

    checkboxes.forEach((cb) => {
        cb.checked = false;
    })

    element.checked = true;

    const roleCheckSitter = document.getElementById("sitterCheck");
    const roleCheckCustomer = document.getElementById("customerCheck");
    
    if(roleCheckSitter.checked) {
        document.getElementById("experienceName").style="display:block; margin-left:20px; height:30px; width:120px;";
        document.getElementById("experienceField").style="display:block; align-items:center; height:30px; width:300px; border-radius:10px;";
        document.getElementById("typeName").style="display:block margin-left:20px; height:30px; width:120px;";
        document.getElementById("typeSelect").style="display:block display:grid; grid-template-columns: 1fr 1fr 1fr; align-items: center; height: 30px; width: 300px;";
    }
    if(roleCheckCustomer.checked) {
        document.getElementById("experienceName").style="display:none";
        document.getElementById("experienceField").style="display:none";
        document.getElementById("typeName").style="display:none";
        document.getElementById("typeSelect").style="display:none";
    }
}

function checkType(element) {
    const checkboxes = document.getElementsByName("type");

    checkboxes.forEach((cb) => {
        cb.checked = false;
    })

    element.checked = true;
}


const preview = document.getElementById("preview");
const imgUpload = document.querySelector('.imgUpload');
const imgUploadButton = document.querySelector('.imgUploadButton');
let uploadedImage;

imgUploadButton.addEventListener('click', () => imgUpload.click());

imgUpload.addEventListener('change', async () => {
    const file = imgUpload.files[0];

    const formData = new FormData();
    formData.append("thumbnail", file);

    try {
        const response = await fetch(server + "/api/image/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            alert("이미지 업로드 실패")
        }

        const data = await response.json();
        
        uploadedImage = data.data.image;
        preview.src = uploadedImage;
    } catch (err) {
        alert("이미지 업로드 실패");
        imgUpload.value = null;
        preview.src = "";
        return;
    }
});


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
    
    if(!userName) {
        alert("이름을 입력해주세요.");
        return;
    }
    if(!userEmail) {
        alert("이메일을 입력해주세요.");
        return;
    }
    if(!userPassword) {
        alert("비밀번호를 입력해주세요.");
        return;
    }
    if(!userCheckPassword) {
        alert("비밀번호 확인을 입력해주세요.");
        return;
    }
    if(!userExperience && roleCheckSitter.checked) {
        alert("경력을 입력해주세요.");
        return;
    }
    if(!userDiscription) {
        alert("자기소개를 입력해주세요.");
        return;
    }

    if(!uploadedImage) {
        alert("프로필 사진을 넣어주세요.");
        return;
    }

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
                description: userDiscription,
                thumbnail: uploadedImage
            })
        });

        const data = await response.json();

        alert("회원가입 성공");
        location.href = "sitterList.html";
    } catch (err) {
        console.log(err);
        alert("회원가입 실패");
        return;
    }
});