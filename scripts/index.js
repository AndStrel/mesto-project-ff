const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(element, handleDelete) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDelete);
    deleteButton.addEventListener("click", () => {
    const placesItem = deleteButton.closest('.places__item');
    placesItem.remove();});
  return cardElement;
}
function handleDelete(evt) {
  const placesItem = evt.target.closest(".places__item");
  placesItem.remove();
}
initialCards.forEach((element) => {
  placesList.append(createCard(element, handleDelete));
});
