// store the html elements to recall them after a successfull login
const mainGallery = document.querySelectorAll('main section');

//generate the Log In form
function buildLogin() {
    // remove elements of the page to build the Log In form
    document.querySelector('main').textContent = '';
    const formLogin = document.createElement('form');
    formLogin.method = 'get';
    formLogin.id = "login";
    formLogin.action = '';
    const titleLogin = document.createElement('h2');
    titleLogin.innerText = "Log In";
    const emailLabelLogin = document.createElement('label');
    emailLabelLogin.for = 'email';
    emailLabelLogin.innerText = "E-mail";
    const emailLogin = document.createElement('input');
    emailLogin.type = 'email';
    emailLogin.id = "email";
    emailLogin.name = 'email';
    emailLogin.required = 'required';
    const passwordLabelLogin = document.createElement('label');
    passwordLabelLogin.for = 'password';
    passwordLabelLogin.innerText = "Mot de passe";
    const passwordLogin = document.createElement('input');
    passwordLogin.type = 'password';
    passwordLogin.id = "password";
    passwordLogin.name = 'password';
    passwordLogin.required = 'required';
    const buttonLogin = document.createElement('input');
    buttonLogin.type = 'submit';
    buttonLogin.id = "button--login";
    buttonLogin.value = "Se connecter";
    buttonLogin.className = "button button--active";
    const forgottenLogin = document.createElement('a');
    forgottenLogin.innerText = "Mot de passe oublié";
    // generate an error message line (for layout purpose)
    const errorMessage = document.createElement('h3');
    errorMessage.id = "login--alert";
    errorMessage.innerText = "";
    formLogin.append(titleLogin, emailLabelLogin, emailLogin, passwordLabelLogin, passwordLogin, buttonLogin, forgottenLogin, errorMessage);
    document.querySelector('main').appendChild(formLogin);
    // run the function which listen to email and password inputs
    getLogin();
}

// get the value entered by the user
function getLogin() {
    const formLogin = document.querySelector('form');
    formLogin.addEventListener('submit', (event) => {
        event.preventDefault();
        // create an User object with Input's values
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let user = {
            'email': email,
            'password': password
        }
        // run the function which check User ID
        checkLogin(user);
    })
}

// verify login
async function checkLogin(user) {
    // ask the server to check user's inputs
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
    let result = await response.json();
    if (result.message === "user not found") {
        document.getElementById("login--alert").innerText = "Utilisateur non autorisé !";
        setTimeout(() => { document.getElementById("login--alert").innerText = "" }, 1000);
    } else {
        // store the token
        sessionStorage.setItem('token', result.token);
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

// manage the Log Out of Edition Mode
function logOut() {
    // Build the Gallery
    getJSONData();
    // remove the Edition Banner
    if(document.getElementById("edition-banner")) {
        document.getElementById("edition-banner").remove();
    }
    // change the logiin link name to login
    document.getElementById("login").innerText = "login";
    // remove the token from local
    sessionStorage.removeItem('token');
}