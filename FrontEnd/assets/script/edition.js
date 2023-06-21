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
    document.getElementById("edition").addEventListener("click", (event) => {
        event.preventDefault();
        // build the Modal
        getDataBaseWorks().then(works => buildDeleteModal(works));
    })
}
// build the Modal 1st page
function buildDeleteModal(works) {
    const IconClosePopUp = document.createElement('i');
    IconClosePopUp.id = "cross-icon"
    IconClosePopUp.className = "fa-solid fa-xmark";
    const titlePopUp = document.createElement('h3');
    titlePopUp.innerText = "Galerie photo";
    const alertMessage = document.createElement('h4');
    alertMessage.id = "popup--alert";
    const galleryPopUp = document.createElement('div');
    galleryPopUp.className = "popup--gallery";
    const linePopUp = document.createElement('div');
    linePopUp.className = "line";
    const buttonPopUp = document.createElement('button');
    buttonPopUp.innerText = "Ajouter une photo";
    buttonPopUp.className = "button button--active";
    const deleteGalleryPopUp = document.createElement('a');
    deleteGalleryPopUp.innerText = "Supprimer la galerie";
    const PopUp = document.createElement('section');
    PopUp.className = "modal";
    PopUp.append(IconClosePopUp, titlePopUp, alertMessage, galleryPopUp, linePopUp, buttonPopUp, deleteGalleryPopUp);
    const overlayPopUp = document.createElement('div');
    overlayPopUp.className = "overlay";
    document.querySelector('body').prepend(PopUp);
    document.querySelector('body').prepend(overlayPopUp);
    // build the Modal gallery
    buildGallery(works, "popupGallery");
    // listen to the Add button
    buttonPopUp.addEventListener('click', (event) => {
        event.preventDefault();
        getDataBaseCategories().then(categories => buildAddModal(categories));
    })
    // run the function which close the Modal
    closePopUp();
}
// build the Modal 2nd page
function buildAddModal(categories) {
    const IconArrowPopUp = document.createElement('i');
    IconArrowPopUp.id = "left-arrow-icon"
    IconArrowPopUp.className = "fa-solid fa-arrow-left";
    const IconClosePopUp = document.createElement('i');
    IconClosePopUp.id = "cross-icon"
    IconClosePopUp.className = "fa-solid fa-xmark";
    const iconsPopUp = document.createElement('div');
    iconsPopUp.className = "popup--icons";
    iconsPopUp.append(IconArrowPopUp, IconClosePopUp)
    const titlePopUp = document.createElement('h3');
    titlePopUp.innerText = "Ajout photo";
    const alertMessage = document.createElement('h4');
    alertMessage.innerText = " ";
    const formPopUp = document.createElement('form');
    formPopUp.method = 'post';
    formPopUp.id = "add-work";
    formPopUp.enctype = "multipart/form-data";
    formPopUp.action = '';
    const addFileLabel = document.createElement('label');
    addFileLabel.id = 'add-file-label';
    addFileLabel.htmlFor = 'add-file';
    const addFileIcon = document.createElement('i');
    addFileIcon.id = "image-icon"
    addFileIcon.className = "fa-solid fa-image";
    const buttonAddFile = document.createElement('p');
    buttonAddFile.id = "add-file-button";
    buttonAddFile.innerText = "+ Ajouter photo";
    const textFileLimit = document.createElement('p');
    textFileLimit.id = "file-limit";
    textFileLimit.innerText = "jpg, png : 4mo max";
    addFileLabel.append(addFileIcon, buttonAddFile, textFileLimit)
    const addFile = document.createElement('input');
    addFile.type = 'file';
    addFile.id = "add-file";
    addFile.name = 'add-file';
    addFile.accept = '.jpg,.png';
    addFile.required = 'required';
    const addTitleLabel = document.createElement('label');
    addTitleLabel.id = 'add-title';
    addTitleLabel.htmlFor = 'add-title';
    addTitleLabel.innerText = "Titre";
    const addTitleInput = document.createElement('input');
    addTitleInput.type = 'text';
    addTitleInput.id = "add-title-input";
    addTitleInput.name = 'add-title';
    addTitleInput.required = 'required';
    const addCategoryLabel = document.createElement('label');
    addCategoryLabel.id = 'add-category';
    addCategoryLabel.htmlFor = 'add-category';
    addCategoryLabel.innerText = "Catégorie";
    const addCategoriesInput = document.createElement('input');
    addCategoriesInput.setAttribute('list', 'categories');
    addCategoriesInput.id = "add-category-input";
    addCategoriesInput.name = 'add-category';
    addCategoriesInput.required = 'required';
    const categoriesList = document.createElement('datalist');
    categoriesList.id = 'categories';
    for (let i in categories) {
        const categoryOption = document.createElement('option');
        categoryOption.value = categories[i].name;
        categoriesList.appendChild(categoryOption);
    }
    addCategoriesInput.appendChild(categoriesList)
    const linePopUp = document.createElement('div');
    linePopUp.className = "line line-add";
    const buttonPopUp = document.createElement('div');
    buttonPopUp.className = "validation-button-container"
    const button = document.createElement('input');
    button.type = 'submit';
    button.id = "validation-button";
    button.value = "Valider";
    button.className = "button button--active";
    buttonPopUp.appendChild(button);
    formPopUp.append(addFileLabel, addFile, addTitleLabel, addTitleInput, addCategoryLabel, addCategoriesInput, linePopUp, buttonPopUp);
    // delte Modal 1st page before rebuilding
    const PopUp = document.querySelector('section');
    PopUp.classList.add("add-work");
    PopUp.innerText = '';
    PopUp.append(iconsPopUp, titlePopUp, alertMessage, formPopUp);
    document.querySelector('body').prepend(PopUp);
    // run the function which add new work
    addWork(categories);
    // run the function which close the Modal
    closePopUp();
    // run the function which backward to 1s page
    backwardPopUp();
}
// function which close the Modal
function closePopUp() {
    // listen to the Cross Icon
    document.getElementById("cross-icon").addEventListener('click', () => {
        overlayPopUp.remove();
        document.querySelector(".modal").remove();
    })
    // listen to the Overlay
    const overlayPopUp = document.querySelector(".overlay");
    overlayPopUp.addEventListener('click', (event) => {
        if (event.target.className === "overlay") {
            overlayPopUp.remove();
            document.querySelector(".modal").remove();
        };
    })
}
// function which backward the Modal
function backwardPopUp() {
    // listen to the Left Arrow Icon
    document.getElementById("left-arrow-icon").addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector(".modal").remove();
        document.querySelector(".overlay").remove();
        getDataBaseWorks().then(works => buildDeleteModal(works));
    })
}
// function to delete selected work
function deleteWork(works) {
    for (let i in works) {
        // delete selected work when Trash Icon is clicked
        let trashIcon = document.getElementById(`trash--${works[i].id}`);
        // listen to the Trash Icons
        trashIcon.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById("popup--alert").innerText = `Suppression du projet: "${works[i].title}"`;
            setTimeout(() => { document.getElementById("popup--alert").innerText = "" }, 1500);
            let workID = event.target.getAttribute('id').replace("trash--", "");
            deleteWorkData(workID);
            getDataBaseWorks().then(works => buildGallery(works, "popupGallery"))
            getDataBaseWorks().then(works => buildGallery(works, "mainGallery"))
        })
    }
}
// function to add a work
function addWork(categories) {
    const addedImage = document.getElementById("add-file")
    addedImage.addEventListener('input', () => {
        let workImageDiv = document.createElement('div');
        let workImage = document.createElement('img');
        workImage.id = "added-image";
        workImageDiv.appendChild(workImage);
        const addFileLabel = document.getElementById("add-file-label");
        addFileLabel.innerText = " ";
        addFileLabel.appendChild(workImageDiv);
        workImage = document.getElementById("added-image")
        const workImageFile = document.getElementById("add-file").files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            workImage.src = reader.result;
        },
        false
        );
        if (workImageFile) {
            reader.readAsDataURL(workImageFile)
        }
    })
    const validationButton = document.getElementById("add-work");
    // listen to the Form Button
    validationButton.addEventListener('submit', (event) => {
        event.preventDefault();
        // get entries from the Form
        const workTitle = document.getElementById("add-title-input").value;
        const workImage = document.querySelector('input[type="file"]');
        const workCategoryName = document.getElementById("add-category-input").value;
        const newWork = new FormData();
        for (let i in categories) {
            if (categories[i].name === workCategoryName) {
                const workCategoryId = categories[i].id;
                newWork.append('title', workTitle);
                newWork.append('category', workCategoryId);
                newWork.append('image', workImage.files[0]);
                addWorkData(newWork);
            }
        }
    })
}