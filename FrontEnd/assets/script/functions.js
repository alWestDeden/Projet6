function buildGallery(works, type) {
    // delete the content of the gallery before importing from Server
    document.querySelector(".gallery").textContent = "";
    // create the gallery (made of <figure> containers)
    for (let i in works) {
        let figureWork = document.createElement('figure');
        let imageWork = document.createElement('img');
        imageWork.src = works[i].imageUrl;
        let captionWork = document.createElement('figcaption');
        if (type === "popup") {
            let trashAndImage = document.createElement('div');
            trashAndImage.className = "figure";
            trashAndImage.id = `figure--${works[i].id}`;
            captionWork.innerText = "éditer";
            figureWork.append(imageWork, captionWork);
            let trashIcon = document.createElement('i');
            trashIcon.className = "fa-solid fa-trash-can";
            trashIcon.id = works[i].id;
            trashAndImage.append(figureWork, trashIcon);
            document.querySelector(".galleryPopUp").appendChild(trashAndImage);
            if ((Number(i) + 1) === works.length) { deleteWork(works) }
        } else {
            // use work's title as text alternative
            imageWork.alt = works[i].title;
            captionWork.innerText = works[i].title;
            figureWork.append(imageWork, captionWork);
            document.querySelector(".gallery").appendChild(figureWork);
        }
    } 
}

function buildFilters(categories) {
    // create a new array from categories with a no Filter option
    const filterCategories = [{"id": 0, "name": "Tous"}].concat(categories);
    // delete the content of the filter (if any) before bulding it
    document.querySelector(".filter").textContent = "";
    // create the filters
    for (let i in filterCategories) {
        filterList = document.createElement('li');
        filterButton = document.createElement('button');
        // get the filter's name from DataBase
        filterButton.innerText = filterCategories[i].name;
        filterButton.classList.add("button");
        filterButton.id = `filter--${Number(i)}`;
        filterList.appendChild(filterButton);
        document.querySelector(".filter").appendChild(filterList);
    }
}

function activeFilter(works) {
    const buttonState = document.getElementsByClassName("button");
    for (let i in buttonState) {
        buttonState.item(i).addEventListener("click", (event) => {
            // remove active class from previous selected filter
            for (let active of buttonState) {
                active.classList.remove("button--active");
            }
            // add active class to the clicked button
            buttonState.item(i).classList.add("button--active");
            // get filter button id to apply corresponding filter
            let buttonID = buttonState.item(i).id;
            switch (buttonID) {
                case "filter--0":
                    buildGallery(works);
                    break;
                case "filter--1":
                    const filterObjects = works.filter(work => work.category.name === "Objets");
                    buildGallery(filterObjects);
                    break;
                case "filter--2":
                    const filterApartments = works.filter(work => work.category.name === "Appartements");
                    buildGallery(filterApartments);
                    break;
                case "filter--3":
                    const filterHotelsAndRestaurants = works.filter(work => work.category.name === "Hotels & restaurants");
                    buildGallery(filterHotelsAndRestaurants);
                    break;
            }
        })
    }
}