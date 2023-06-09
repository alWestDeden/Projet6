// get Data (previous works) from the server
async function getJSONData() {
    // ask the server and wait
    const worksDB = await fetch("http://localhost:5678/api/works");
    const categoriesDB = await fetch("http://localhost:5678/api/categories");
    // process the Data as JSON
    const works = await worksDB.json();
    const categories = await categoriesDB.json();
  
    buildGallery(works);
    buildFilters(categories);
    activeFilter(works);

}

getJSONData();

// listen to the Log In link
document.getElementById("login").addEventListener('click', (event) => {
    // check if there is a Token
    let token = sessionStorage.getItem("token");
    // no Token => Log In
    if (token === undefined || token === null) {
        buildLogin();
        // Token => Log Out
    } else {
        logout();
    }
})