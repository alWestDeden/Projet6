// store the html elements to recall them after a successfull login
const mainGallery = document.querySelector('main');
const mainGalleryHTML = mainGallery.innerHTML;
    
function buildLogin() {
    // remove elements of the page to build the Log In form
    const main = document.querySelector('main');
    main.innerHTML = '';
    // generate the Log In form
    const formLogin = document.createElement('form');
    formLogin.id = "login";
    formLogin.setAttribute("action", " ");
    formLogin.setAttribute("method", "get");
    // generate the Log In title
    const titleLogin = document.createElement('h2');
    titleLogin.innerText = "Log In";
    // generate the E-mail input
    const emailLabelLogin = document.createElement('label');
    emailLabelLogin.innerText = "E-mail";
    emailLabelLogin.setAttribute("for", "email");
    const emailLogin = document.createElement('input');
    emailLogin.setAttribute("type", "email");
    emailLogin.setAttribute("id", "email");
    emailLogin.setAttribute("name", "email");
    emailLogin.setAttribute("required", "");
    // generate the Password input
    const passwordLabelLogin = document.createElement('label');
    passwordLabelLogin.innerText = "Mot de passe";
    passwordLabelLogin.setAttribute("for", "password");
    const passwordLogin = document.createElement('input');
    passwordLogin.setAttribute("type", "password");
    passwordLogin.setAttribute("id", "password");
    passwordLogin.setAttribute("name", "password");
    passwordLogin.setAttribute("required", "");
    // generate the Submit button
    const buttonLogin = document.createElement('input');
    buttonLogin.setAttribute("id", "button--login");
    buttonLogin.setAttribute("type", "submit");
    buttonLogin.setAttribute("value", "Se connecter");
    buttonLogin.classList.add("button", "button--active");
    // generate the forgotten password link
    const forgottenLogin = document.createElement('a');
    forgottenLogin.innerText = "Mot de passe oublié";
    // generate an error message line (for layout purpose)
    const errorMessage = document.createElement('h3');
    errorMessage.innerText = " ";
    // append the above elements to the form 
    const elementsLogin = [titleLogin, emailLabelLogin, emailLogin, passwordLabelLogin, passwordLogin, buttonLogin, forgottenLogin, errorMessage]
    for (let i in elementsLogin) {
        formLogin.appendChild(elementsLogin[i]);
    }
    // build the Log In page
    main.appendChild(formLogin);
    // listen to email and password inputs
    getLogin();
}

// get the value entered by the user
function getLogin() {
    const formLogin = document.querySelector('form');
    const errorMessage = document.querySelector('h3')
    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailLogin = document.getElementById("email");
        // delete alert message if any
        emailLogin.addEventListener("click", () => {
            errorMessage.innerText = "";
        })
        let email = emailLogin.value;
        // delete alert message if any
        const passwordLogin = document.getElementById("password");
        passwordLogin.addEventListener("click", () => {
            errorMessage.innerText = "";
        })
        let password = passwordLogin.value;
        let user = {
            "email": email,
            "password": password
        }
        // check the email and password values
        checkLogin(user);
    })
}

// verify login
async function checkLogin(user) {
    const errorMessage = document.querySelector('h3')
    // ask the server to check user's inputs
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
    let result = await response.json();
    if (result.message === "user not found") {
        errorMessage.innerText = "Utilisateur non autorisé !";
    } else {
        // store the token
        sessionStorage.setItem("token", result.token);
        // reset the Log In form
        const main = document.querySelector('main');
        main.innerHTML = '';
        // recall the HTML main
        main.innerHTML = mainGalleryHTML;
        // rebuild the gallery
        getJSONData();
        // replace login par logout
        // build the banner of Edition Mode
        buildEditionBanner();
    }
}

function logout() {
    // remove the Edition Banner
    const editionBanner = document.getElementById("edition-banner");
    editionBanner.remove();
    // Build the Gallery
    getJSONData();
    // change the logiin link name to login
    const loginText = document.getElementById("login");
    loginText.innerText = "login";
    // remove the token from local
    sessionStorage.removeItem("token");
}