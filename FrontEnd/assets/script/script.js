// get Data (previous works) from the server
async function getJSONData() {
    // ask the server and wait
    const worksDB = await fetch('http://localhost:5678/api/works');
    const categoriesDB = await fetch('http://localhost:5678/api/categories');
    // process the Data as JSON
    const works = await worksDB.json();
    const categories = await categoriesDB.json();

  
    buildGallery(works, "mainGallery");
    buildFilters(categories);
    activeFilter(works);
    
    // check if in Edition Mode if so then allow build of Pop-Up
    if (document.getElementById("edition")) {
        document.getElementById("edition").addEventListener("click", (event) => {
            event.preventDefault();
            buildPopUp(works);
        })
    }
}

getJSONData();

// anonymous Log In function
(function() {
    document.getElementById("login").addEventListener('click', (event) => {
        let token = sessionStorage.getItem("token");
        // no Token => Log In
        if (token === undefined || token === null) { 
            buildLogin();
            // Token => Log Out
        } else { logOut() }
    })
})
();
