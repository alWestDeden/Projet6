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

const loginLink = document.getElementById("login");
loginLink.addEventListener('click', (event) => {
    buildLogin();
})