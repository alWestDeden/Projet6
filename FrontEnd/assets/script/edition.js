
// build theBanner in Edition Mode
function buildEditionBanner() {
    const body = document.querySelector('body');
    const editionBanner = document.createElement('div');
    editionBanner.classList.add("edition-banner");
    const iconEdition = document.createElement('i');
    iconEdition.className = "fa-regular fa-pen-to-square";
    const textEdition = document.createElement('p');
    textEdition.innerText = "Mode édition";
    const buttonEdition = document.createElement('button');
    buttonEdition.classList.add("button", "button-edition");
    buttonEdition.innerText = "publier les changements";
    let bannerItems = [iconEdition, textEdition, buttonEdition];
    for (i in bannerItems) {
        editionBanner.appendChild(bannerItems[i]);
    }
    body.prepend(editionBanner);
}