import getUser from "../services/getUser.js";

const formLogin = document.querySelector(".main__form")

const validation = () => {
    const formData = {};
    let emptyField = "";
    const inputsNodeList = document.querySelectorAll("input");
    const labelNodeList = document.querySelectorAll("label");
    const inputs = Array.from(inputsNodeList)
    const labels = Array.from(labelNodeList)
    
    inputs.forEach(item => {
        if (item.id) {
            formData[item.id] = item.value;
        }
    })
    for (const key in formData) {
        if (!formData[key]) {
            const label = labels.find(item => item.getAttribute('for') === key)
            const labelInnerText = label.innerText.substring(0,label.innerText.length - 1);
            emptyField += `${labelInnerText} `;
        }
    }

    if (emptyField) {
        return {
            data:{},
            message: `Campos vacios: ${emptyField}`
        };
    } else {
        return {
            data: formData,
            message: ""
        };
    }
}

const submitLogin = async (form) => {
    const userLogin = validation();
    if (userLogin.message) {
        Swal.fire("Oops!", userLogin.message, "error");
    } else {
        const user = await getUser(
            userLogin.data.userName,
            userLogin.data.paswoord,
            userLogin.data.Administrador
        );
        if (user.length) {
            swal.fire(
            "Excelente!",
            `${user[0].name} Has iniciado sesion`,
            "succes"
        ).then(() => {
            sessionStorage.setItem("user", JSON.stringify(user[0]));
            window.location = "./panelAdmin.html";
        });
        } else {
        swal.fire("Oops!", "Datos de usuario incorrectos", "error").then(() => {
            form.reset()
            });
        }
    }
};

formLogin.addEventListener("submit", async(event) =>{
    event.preventDefault();
    await submitLogin(formLogin);
});