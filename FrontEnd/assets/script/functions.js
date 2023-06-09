function buildGallery(selectedWorks) {
    // delete the content of the gallery before importing from Server
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""
    // create the gallery (made of <figure> containers)
    for (let i in selectedWorks) {
        let figureWork = document.createElement('figure');
        let imageWork = document.createElement('img');
        imageWork.src = selectedWorks[i].imageUrl;
        // use work's title as text alternative
        imageWork.alt = selectedWorks[i].title;
        let captionWork = document.createElement('figcaption');
        captionWork.innerText = selectedWorks[i].title;
        figureWork.append(imageWork, captionWork);
        gallery.appendChild(figureWork);
    }
}

function buildFilters(categories) {
    // create a new array from categories with a no Filter option
    const noFilter = {"id": 0, "name": "Tous"};
    const filterCategories = [noFilter].concat(categories);
    // delete the content of the filter (if any) before bulding it
    const filter = document.querySelector(".filter");
    filter.innerHTML = "";
    // create the filters
    for (let i in filterCategories) {
        filterList = document.createElement('li');
        filterButton = document.createElement('button');
        filterList.appendChild(filterButton);
        // get the filter's name from DataBase
        filterButton.innerText = filterCategories[i].name;
        filterButton.classList.add("button");
        filterButton.setAttribute("id", `filter--${Number(i)}`);
        filter.appendChild(filterList);
    }
}

function activeFilter(works) {
    const buttonState = document.getElementsByClassName("button");
    for (let i in buttonState) {
        buttonState.item(i).addEventListener("click", (event) => {
            for (let active of buttonState) {
                // remove active class from previous selected filter
                active.classList.remove("button--active");
            }
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