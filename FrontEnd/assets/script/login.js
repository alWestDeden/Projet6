// store the html elements to recall them after a successfull login
const mainGallery = document.querySelectorAll('main section');
    
function buildLogin() {
    // remove elements of the page to build the Log In form
    document.querySelector('main').textContent = '';
    // generate the Log In form
    const formLogin = document.createElement('form');
    formLogin.method = "get";
    formLogin.id = "login";
    formLogin.action = "";
    // generate the Log In title
    const titleLogin = document.createElement('h2');
    titleLogin.innerText = "Log In";
    // generate the E-mail input
    const emailLabelLogin = document.createElement('label');
    emailLabelLogin.for = "email";
    emailLabelLogin.innerText = "E-mail";
    const emailLogin = document.createElement('input');
    emailLogin.type = "email";
    emailLogin.id = "email";
    emailLogin.name = "email";
    emailLogin.required = "required";
    // generate the Password input
    const passwordLabelLogin = document.createElement('label');
    passwordLabelLogin.for = "password";
    passwordLabelLogin.innerText = "Mot de passe";
    const passwordLogin = document.createElement('input');
    passwordLogin.type = "password";
    passwordLogin.id = "password";
    passwordLogin.name = "password";
    passwordLogin.required = "required";
    // generate the Submit button
    const buttonLogin = document.createElement('input');
    buttonLogin.type = "submit";
    buttonLogin.id = "button--login";
    buttonLogin.value = "Se connecter";
    buttonLogin.className = "button button--active";
    // generate the forgotten password link
    const forgottenLogin = document.createElement('a');
    forgottenLogin.innerText = "Mot de passe oublié";
    // generate an error message line (for layout purpose)
    const errorMessage = document.createElement('h3');
    errorMessage.innerText = " ";
    // append the above elements to the form 
    formLogin.append(titleLogin, emailLabelLogin, emailLogin, passwordLabelLogin, passwordLogin, buttonLogin, forgottenLogin, errorMessage);
    // build the Log In page
    document.querySelector('main').appendChild(formLogin);
    // listen to email and password inputs
    getLogin();
}

// get the value entered by the user
function getLogin() {
    const formLogin = document.querySelector('form');
    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();
        // create a function to remove error messages
        let removeErrorMessage = function () { document.querySelector('h3').innerText = ''; };
        // delete alert message if any
        document.getElementById("email").addEventListener("click", removeErrorMessage);
        document.getElementById("password").addEventListener("click", removeErrorMessage);
        // create an User for Inputs values
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let user = {
            "email": email,
            "password": password
        }
        // check the User
        checkLogin(user);
    })
}

// verify login
async function checkLogin(user) {
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
        document.querySelector('h3').innerText = "Utilisateur non autorisé !";
    } else {
        // store the token
        sessionStorage.setItem("token", result.token);
        // reset the Log In form
        document.querySelector('main').textContent = '';
        // recall the HTML main and rebuild
        for (let elementHTML of mainGallery)  document.querySelector('main').appendChild(elementHTML);
        // rebuild the gallery
        getJSONData();
        // replace login par logout
        document.getElementById("login").innerText = "logout";
        // build the banner of Edition Mode
        buildEditionBanner();
    }
}

function logout() {
    // Build the Gallery
    getJSONData();
    // remove the Edition Banner
    document.getElementById("edition-banner").remove();
    // change the logiin link name to login
    document.getElementById("login").innerText = "login";
    // remove the token from local
    sessionStorage.removeItem("token");
}