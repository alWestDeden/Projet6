// get Works from DataBase
async function getDataBaseWorks() {
    try {
        const worksDB = await fetch('http://localhost:5678/api/works');
        const works = await worksDB.json();
        return works;
    } catch (error) { window.alert(error) }
}
// get Categories from DataBase
async function getDataBaseCategories() {
    try {
        const categoriesDB = await fetch('http://localhost:5678/api/categories');
        const categories = await categoriesDB.json();
        return categories;
    } catch (error) { window.alert(error) }
}
// anonymous function to build the Main page
(() => {
    getDataBaseWorks().then(works => buildGallery(works, "mainGallery"));
    getDataBaseCategories().then(categories => buildFilters(categories));
})();
// delete work from DataBase
async function deleteWorkData(workID) {
    try {
        let token = sessionStorage.getItem('token');
        const worksDB = await fetch(`http://localhost:5678/api/works/${workID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
    } catch (error) {
        document.getElementById("popup--alert").innerText = error;
        setTimeout(() => { document.getElementById("popup--alert").innerText = " " }, 1500);
    }
}
// add work to DataBase
async function addWorkData(newWork) {
    try {
        let token = sessionStorage.getItem('token');
        const worksDB = await fetch(`http://localhost:5678/api/works`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: newWork
        })
        .then((response) => {
            if (response.ok) {
                // go to the 1st Modal page
                document.querySelector(".modal").remove();
                document.querySelector(".overlay").remove();
                getDataBaseWorks().then(works => buildGallery(works, "mainGallery"))
                getDataBaseWorks().then(works => { buildDeleteModal(works) })
            }
        })
    } catch (error) {
        document.getElementById("popup--alert").innerText = error;
        setTimeout(() => { document.getElementById("popup--alert").innerText = " " }, 1500);
    } 
}
// anonymous function for the Navigation's Projects Link
(() => {
    document.getElementById("projects").addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector('main').textContent = '';
        // recall the HTML main and rebuild
        for (let elementHTML of mainGallery) { document.querySelector('main').appendChild(elementHTML) };
        // rebuild the gallery
        getDataBaseWorks().then(works => buildGallery(works, "mainGallery"));
    })
})();