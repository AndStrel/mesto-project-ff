const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(element, handleDelete) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  function handleDelete() {
    const placesItem = deleteButton.closest(".places__item");
    placesItem.remove();
  };
  deleteButton.addEventListener("click", handleDelete);
  placesList.append(cardElement);
  return cardElement;
}
initialCards.forEach(createCard);
