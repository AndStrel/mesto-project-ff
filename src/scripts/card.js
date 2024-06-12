const cardTemplate = document.querySelector("#card-template").content;
const popupImagePicture = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

// ФУНКЦИЯ СОЗДАНИЯ КАРТОЧЕК ИЗ ШАБЛОНА
function createCard(obj, handleDelete, openImage, likeCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = obj.name;
  cardImage.src = obj.link;
  cardImage.alt = obj.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => handleDelete(cardElement));
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  cardImage.addEventListener("click", () => {
    openImage(cardTitle.textContent, cardImage.src);
  });
  return cardElement;
}

// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ
function handleDelete(item) {
  item.remove();
}

// ФУНКЦИЯ ЛАЙКАНИЯ КАРТОЧКИ
function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

//функция передачи параметров при открытия картинки
function openImage(name, link) {
  popupImagePicture.src = link;
  popupImagePicture.alt = name;
  popupImageCaption.textContent = name;
}

export { createCard, handleDelete, likeCard, openImage };
