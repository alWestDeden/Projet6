// build the Banner in Edition Mode
function buildEditionBanner() {
    const iconEdition = document.createElement('i');
    iconEdition.className = "fa-regular fa-pen-to-square";
    const textEdition = document.createElement('a');
    textEdition.innerText = "Mode édition";
    textEdition.id = "edition";
    const buttonEdition = document.createElement('button');
    buttonEdition.className = "button button-edition";
    buttonEdition.innerText = "publier les changements";
    const editionBanner = document.createElement('div');
    editionBanner.className = "edition-banner";
    editionBanner.id = "edition-banner";
    editionBanner.append(iconEdition, textEdition, buttonEdition);
    document.querySelector('body').prepend(editionBanner);
}

// build the Pop-Up's elements
function buildPopUp(works) {
    const IconClosePopUp = document.createElement('i');
    IconClosePopUp.id = "crossIcon"
    IconClosePopUp.className = "fa-solid fa-xmark";
    const titlePopUp = document.createElement('h3');
    titlePopUp.innerText = "Galerie photo";
    const alertPopUp = document.createElement('h4');
    alertPopUp.id = "popup--alert";
    alertPopUp.innerText = "";
    const galleryPopUp = document.createElement('div');
    galleryPopUp.className = "popup--gallery";
    const linePopUp = document.createElement('div');
    linePopUp.className = "popup--line";
    const buttonPopUp = document.createElement('button');
    buttonPopUp.innerText = "Ajouter une photo";
    buttonPopUp.className = "button button--active";
    const deleteGalleryPopUp = document.createElement('a');
    deleteGalleryPopUp.innerText = "Supprimer la galerie";
    const overlayPopUp = document.createElement('div');
    overlayPopUp.className = "overlay";
    const PopUp = document.createElement('aside');
    PopUp.className = "popup";
    PopUp.append(IconClosePopUp, titlePopUp, alertPopUp, galleryPopUp, linePopUp, buttonPopUp, deleteGalleryPopUp)
    overlayPopUp.append(PopUp);
    document.querySelector('body').prepend(overlayPopUp);
    // build the popup Gallery
    buildGallery(works, "popupGallery");
    // run the function which close the Pop Up
    closePopUp();
}

// function which close the Pop-Up
function closePopUp() {
    // listen to the overlay
    const overlayPopUp = document.querySelector(".overlay");
    // listen to the cross icon
    document.getElementById("crossIcon").addEventListener('click', (event) => {
        overlayPopUp.remove();
    })
    overlayPopUp.addEventListener('click', (event) => {
        if (event.target.className === "overlay") { overlayPopUp.remove() };
    })
}

// function to delete selected work
function deleteWork(works) {
    // listen to the trash icons
    for (let i in works) {
        let trashIcon = document.getElementById(`trash--${works[i].id}`);
        trashIcon.addEventListener('click', async(event) => {
            event.preventDefault();
            event.stopPropagation;
            let workID = event.target.getAttribute('id').replace("trash--", "");
            let token = sessionStorage.getItem('token');
            console.log(workID);
            // delete clicked work from DataBase
            const worksDB = await fetch(`http://localhost:5678/api/works/${workID}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
            })
            // if ok then rebuild the gallery
            .then(function(response) {
                if (response.ok) {
                    // works = worksDB.json();
                    // print during 1s the deleted Project
                    document.getElementById("popup--alert").innerText = `Suppression du projet: "${works[i].title}"`;
                    // setTimeout(() => { document.getElementById("popup--alert").innerText = "" }, 1000);
                    // erase the Pop-Up Gallery before rebuilding it
                    // document.querySelector(".popup--gallery").innerText = '';
                    // buildGallery(works, "popupGallery");
                } else { document.getElementById("popup--alert").innerText = error; }
            })
        }) 
    }
}