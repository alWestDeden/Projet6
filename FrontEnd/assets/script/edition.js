// build theBanner in Edition Mode
function buildEditionBanner() {
    const editionBanner = document.createElement('div');
    editionBanner.classList.add("edition-banner");
    editionBanner.id = "edition-banner";
    const iconEdition = document.createElement('i');
    iconEdition.className = "fa-regular fa-pen-to-square";
    const textEdition = document.createElement('a');
    textEdition.innerText = "Mode édition";
    textEdition.id = "edition";
    const buttonEdition = document.createElement('button');
    buttonEdition.classList.add("button", "button-edition");
    buttonEdition.innerText = "publier les changements";
    let bannerItems = [iconEdition, textEdition, buttonEdition];
    for (let i in bannerItems) {
        editionBanner.appendChild(bannerItems[i]);
    }
    document.querySelector('body').prepend(editionBanner);
}

function buildPopUp(works) {
    // build the Pop-Up's elements
    const IconClosePopUp = document.createElement('i');
    IconClosePopUp.id = "Pop-Up--Close"
    IconClosePopUp.className = "fa-solid fa-xmark";
    const titlePopUp = document.createElement('h3');
    titlePopUp.innerText = "Galerie photo";
    const galleryPopUp = document.createElement('div');
    galleryPopUp.className = "galleryPopUp";
    const linePopUp = document.createElement('div');
    linePopUp.className = "pop-up--line";
    const buttonPopUp = document.createElement('button');
    buttonPopUp.innerText = "Ajouter une photo";
    buttonPopUp.className = "button button--active";
    const deleteGalleryPopUp = document.createElement('a');
    deleteGalleryPopUp.innerText = "Supprimer la galerie";
    // build the Pop-Up
    const backgroundPopUp = document.createElement('div');
    backgroundPopUp.className = "pop-up__background";
    const PopUp = document.createElement('aside');
    PopUp.className = "pop-up";
    PopUp.append(IconClosePopUp, titlePopUp, galleryPopUp, linePopUp, buttonPopUp, deleteGalleryPopUp)
    backgroundPopUp.append(PopUp);
    document.querySelector('body').prepend(backgroundPopUp);
    // delete the content of the gallery before importing from Server
    document.querySelector(".galleryPopUp").textContent = "";
    buildGallery(works, "popup")
    closePopUp(backgroundPopUp);
}

function closePopUp(backgroundPopUp) {
    // listen to icon to close the Pop-Up
    document.getElementById("Pop-Up--Close").addEventListener("click", (event) => {
        backgroundPopUp.remove();
    })
    // listen to icon to close the Pop-Up
    backgroundPopUp.addEventListener("click", (event) => {
        if (event.target.className === "pop-up__background") {backgroundPopUp.remove()};
    })
}

function deleteWork(works) {
    for (let i in works) {
        let trashIcon = document.getElementById(works[i].id);
        trashIcon.addEventListener('click', async(event) => {
            event.preventDefault();
            let workID = event.target.getAttribute('id');
            let token = sessionStorage.getItem("token");
            fetch(`http://localhost:5678/api/works/${workID}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Authorization': 'Bearer ${token}'
                },
            });
            /*.then(function(response) {
                if (response.ok) {
                    buildGallery(works);
                } else {
                    console.log(error);
                }
            })*/
            let work = document.getElementById(`figure--${workID}`);
            console.log(work)
            // work.remove();
        })
    }
}