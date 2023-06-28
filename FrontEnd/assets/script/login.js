// store the HTML elements to recall them after a successfull login
const sectionIntroduction = document.getElementById("introduction");
let sectionPortfolio = document.getElementById("portfolio");
const sectionContact = document.getElementById("contact");
// generate the Log In form
function buildLogin() {
    // delete elements first
    document.querySelector('main').textContent = '';
    const formLogin = document.createElement('form');
    formLogin.method = 'get';
    formLogin.id = "login";
    formLogin.action = '';
    const titleLogin = document.createElement('h2');
    titleLogin.innerText = "Log In";
    // generate an error message line (for layout purpose)
    const errorMessage = document.createElement('h3');
    errorMessage.id = "login--alert";
    const emailLabelLogin = document.createElement('label');
    emailLabelLogin.htmlFor = 'email';
    emailLabelLogin.innerText = "E-mail";
    const emailLogin = document.createElement('input');
    emailLogin.type = 'email';
    emailLogin.name = 'email';
    emailLogin.id = 'email';
    emailLogin.autocomplete = 'email';
    emailLogin.required = 'required';
    const passwordLabelLogin = document.createElement('label');
    passwordLabelLogin.htmlFor = 'password';
    passwordLabelLogin.innerText = "Mot de passe";
    const passwordLogin = document.createElement('input');
    passwordLogin.type = 'password';
    passwordLogin.name = 'password';
    passwordLogin.id = 'password';
    passwordLogin.required = 'required';
    const buttonLogin = document.createElement('input');
    buttonLogin.type = 'submit';
    buttonLogin.value = "Se connecter";
    buttonLogin.className = "button button--active";
    const forgottenLogin = document.createElement('a');
    forgottenLogin.innerText = "Mot de passe oublié";
    formLogin.append(titleLogin, errorMessage, emailLabelLogin, emailLogin, passwordLabelLogin, passwordLogin, buttonLogin, forgottenLogin);
    document.querySelector('main').appendChild(formLogin);
    // run the function which listen to E-mail and Password inputs
    getLogin();
}
// get the values entered by the user
function getLogin() {
    const formLogin = document.querySelector('form');
    const emailLogin = document.querySelector("#email");
    emailLogin.addEventListener('focusout', () => {
        let email = document.getElementById("email").value;
        let regex = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+");
        let resultat = regex.test(email);
        if (!resultat) { 
            document.getElementById("login--alert").innerText = "Format de l'email invalide !";
            setTimeout(() => { document.getElementById("login--alert").innerText = "" }, 1000);
        }
    })
    formLogin.addEventListener('submit', (event) => {
        event.preventDefault();
        // create an User object with the Input's values
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
    // ask the server to check user's Inputs
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
        // recall the Portfolio section to remove the Filters part
        let filters = sectionPortfolio.querySelector(".filter");
        filters.textContent = '';
        // recall the HTML sections and rebuild
        document.querySelector('main').append(sectionIntroduction, sectionPortfolio, sectionContact)
        // replace login par logout
        document.getElementById("login").innerText = "logout";
        // build the banner of Edition Mode
        buildEditionBanner();
        // show the Modify Links
        addModifyLinks();
    }
}
// manage the Log Out of Edition Mode
function logOut() {
    // remove the Edition Banner
    if(document.getElementById("edition-banner")) {
        document.getElementById("edition-banner").remove();
    }
    // build the Gallery
    getDataBaseWorks().then(works => buildGallery(works, "mainGallery"));
    getDataBaseCategories().then(categories => buildFilters(categories));
    // change the Login link name to login
    document.getElementById("login").innerText = "login";
    // remove the token from local
    sessionStorage.removeItem('token');
    // hide the modify links
    removeModifyLinks();
}
// remove the Modify links
function removeModifyLinks() {
    const showModifyLinks = document.getElementsByClassName("modify-link");
    for (let i = 0; i < showModifyLinks.length; i++) {
        showModifyLinks[i].classList.add("hide-modify")
    }
}