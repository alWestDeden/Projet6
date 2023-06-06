// get Data (previous works) from the server
async function getJSONData() {
    // ask the server and wait
    const worksDB = await fetch("http://localhost:5678/api/works");
    const categoriesDB = await fetch("http://localhost:5678/api/categories");
    // process the Data as JSON
    const works = await worksDB.json();
    const categories = await categoriesDB.json();

    // delete the content of the gallery before importing from Server
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""

    // delete the content of the gallery before importing from Server
    const filter = document.querySelector(".filter");
    filter.innerHTML = ""

    // create the gallery (made of <figure> containers)
    for (let i in works) {
        let figureWork = document.createElement('figure');
        let imageWork = document.createElement('img');
        imageWork.src = works[i].imageUrl;
        // use work's title as text alternative
        imageWork.alt = works[i].title;
        let captionWork = document.createElement('figcaption');
        captionWork.innerText = works[i].title;
        figureWork.append(imageWork, captionWork);
        gallery.appendChild(figureWork);
    }
    
    // create the "show all works" filter
    let filterList = document.createElement('li');
    let filterButton = document.createElement('button');
    filterList.appendChild(filterButton);
    filterButton.classList.add("filter__button", "filter__button--active")
    filterButton.innerText = "Tous";
    filter.appendChild(filterList);

    // create the filters section
    for (let i in categories) {
        filterList = document.createElement('li');
        filterButton = document.createElement('button');
        filterList.appendChild(filterButton);
        // get the name from DataBase
        filterButton.innerText = categories[i].name;
        filterButton.classList.add("filter__button");
        filter.appendChild(filterList);
    }
    
    // generate the active filter
    let buttonState = document.getElementsByClassName("filter__button");
    console.log(buttonState);
    for (let i in buttonState) {
        buttonState.item(i).addEventListener("click", (event) => {
            for (let active of buttonState) {
                active.classList.remove("filter__button--active");
            }
            buttonState.item(i).classList.add("filter__button--active");
        });
    };
}

getJSONData();