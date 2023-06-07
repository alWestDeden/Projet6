function login() {
    // remove elements of the page to build Log In
    const main = document.querySelector('main');
    main.innerHTML = '';
    // generate the Log In title
    const titleLogin = document.createElement('h2');
    titleLogin.innerText = "Log In";
    // generate the Log In form
    const formLogin = document.createElement('form');
    formLogin.id = "login";
    // generate the E-mail input
    const emailLabelLogin = document.createElement('label');
    emailLabelLogin.innerText = "E-mail"
    const emailLogin = document.createElement('input');
    emailLogin.setAttribute("required", "");
    // generate the Password input
    const passwordLabelLogin = document.createElement('label');
    passwordLabelLogin.innerText = "Mot de passe";
    const passwordLogin = document.createElement('input');
    passwordLogin.setAttribute("required", "");
    // generate E-mail and Password inputs attributes
    const inputsLogin = ["email", "passwords"];
    for (let i in inputsLogin) {
        `${inputsLogin[i]}LabelLogin.setAttribute("for", "${inputsLogin[i]}")`;
        `${inputsLogin[i]}Login.setAttribute("type", "${inputsLogin[i]}")`;
        `${inputsLogin[i]}Login.setAttribute("id", "${inputsLogin[i]}")`;
        `${inputsLogin[i]}Login.setAttribute("name", "${inputsLogin[i]}")`;
    }
    // generate the Submit button
    const buttonLogin = document.createElement('input');
    buttonLogin.setAttribute("type", "submit");
    buttonLogin.setAttribute("value", "Se connecter");
    buttonLogin.classList.add("button", "button--active");
    // generate the forgotten password link
    const forgottenLogin = document.createElement('a');
    forgottenLogin.innerText = "Mot de passe oublié";
    // append the above elements to the form 
    const elementsLogin = [titleLogin, emailLabelLogin, emailLogin, passwordLabelLogin, passwordLogin, buttonLogin, forgottenLogin]
    for (let i in elementsLogin) {
        formLogin.appendChild(elementsLogin[i]);
    }
    // build the Log In page
    main.appendChild(formLogin);
}