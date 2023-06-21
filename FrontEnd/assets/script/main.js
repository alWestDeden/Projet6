// anonymous Log In's link  function
(() => {
    document.getElementById("login").addEventListener('click', (event) => {
        let token = sessionStorage.getItem("token");
        // no Token => Log In
        if (token === undefined || token === null) { buildLogin();
            // Token => Log Out first
        } else { logOut() }
    })
})();
// build the Galleries (in Main page and in Modal)
function buildGallery(works, type) {
    // delete the previous content first
    switch (type) {
        case "mainGallery":
            document.querySelector('.gallery').textContent = ''
            break;
        case "popupGallery":
            document.querySelector('.popup--gallery').textContent = ''
            break;
    }
    // build the galleries
    for (let i in works) {
        let figureWork = document.createElement('figure');
        let imageWork = document.createElement('img');
        imageWork.src = works[i].imageUrl;
        let captionWork = document.createElement('figcaption');
        // Modal gallery part
        if (type === "popupGallery") {
            // create a container to allow the deletion of work's caption and trash icon at the same time
            let trashAndImage = document.createElement('div');
            trashAndImage.className = "figure";
            // identify each container to corresponding work
            trashAndImage.id = `figure--${works[i].id}`;
            captionWork.innerText = "éditer";
            figureWork.append(imageWork, captionWork);
            let trashIcon = document.createElement('i');
            trashIcon.className = "fa-solid fa-trash-can";
            let selectedWork = document.createElement('i');
            selectedWork.className = "fa-solid fa-arrows-up-down-left-right";
            selectedWork.classList.add("hover-work");
            // identify each trash icons to corresponding work
            trashIcon.id = `trash--${works[i].id}`;
            trashAndImage.append(figureWork, selectedWork, trashIcon);
            document.querySelector(".popup--gallery").appendChild(trashAndImage);
            // allow the deletion of work only after all works have been loaded
            if ((Number(i) + 1) === works.length) {
                deleteWork(works);
            }
        // Main gallery part    
        } else {
            imageWork.alt = works[i].title;
            captionWork.innerText = works[i].title;
            figureWork.append(imageWork, captionWork);
            document.querySelector(".gallery").appendChild(figureWork);
        }
    } 
}
// build the Filters
function buildFilters(categories) {
    // create a new array from categories with a no Filter option
    const filterCategories = [{'id': 0, 'name': "Tous"}].concat(categories);
    // delete the content of the Filters (if any) before bulding it
    document.querySelector(".filter").textContent = '';
    // create the Filters
    for (let i in filterCategories) {
        filterList = document.createElement('li');
        filterButton = document.createElement('button');
        filterButton.innerText = filterCategories[i].name;
        filterButton.classList.add("button");
        filterButton.id = `filter--${Number(i)}`;
        filterList.appendChild(filterButton);
        document.querySelector(".filter").appendChild(filterList);
    }
    // make the no Filter button active on load
    document.getElementById("filter--0").className = "button button--active";
    getDataBaseWorks().then(works => activeFilter(works));
}
// manage which Filter is applyed
function activeFilter(works) {
    // listen to all Filters buttons
    const buttonState = document.querySelectorAll("button");
    for (let b in buttonState) {
        buttonState.item(b).addEventListener('click', () => {
            // remove active class from previous selected Filter
            for (let active of buttonState) {
                active.classList.remove("button--active");
            }
            // add active class to the clicked Filter
            buttonState.item(b).classList.add("button--active");
            // get Filter Button's id to apply corresponding Filter
            let buttonID = buttonState.item(b).id;
            switch (buttonID) {
                case "filter--0":
                    buildGallery(works, "mainGallery");
                    break;
                case "filter--1":
                    const filterObjects = works.filter(work => work.category.name === "Objets");
                    buildGallery(filterObjects, "mainGallery");
                    break;
                case "filter--2":
                    const filterApartments = works.filter(work => work.category.name === "Appartements");
                    buildGallery(filterApartments, "mainGallery");
                    break;
                case "filter--3":
                    const filterHotelsAndRestaurants = works.filter(work => work.category.name === "Hotels & restaurants");
                    buildGallery(filterHotelsAndRestaurants, "mainGallery");
                    break;
            }
        })
    }
}