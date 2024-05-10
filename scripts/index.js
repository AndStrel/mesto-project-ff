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
  deleteButton.addEventListener("click", () => {
    const placesItem = deleteButton.closest('.places__item');
    placesItem.remove();
  });
  return cardElement;
}

initialCards.forEach((item) => {
  placesList.append(createCard(item));
});
