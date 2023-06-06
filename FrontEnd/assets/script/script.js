// get Data (previous works) from the server
async function getJSONData() {
    // ask the server and wait
    const worksDB = await fetch("http://localhost:5678/api/works");
    // process the Data as JSON
    const works = await worksDB.json();

    // delete the content of the gallery before importing from Server
    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""

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
}

getJSONData();