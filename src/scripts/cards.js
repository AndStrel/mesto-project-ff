import { closePopup, openPopupImage, popupNewCard} from "./modal.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// ФУНКЦИЯ СОЗДАНИЯ КАРТОЧЕК ИЗ ШАБЛОНА
function createCard(element, handleDelete, likeCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", handleDelete);
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", () =>
      openPopupImage(cardTitle.textContent, cardImage.src)
    );
  return cardElement;
}
// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ
function handleDelete(evt) {
  if (evt.target.classList.contains("card__delete-button")) {
    evt.target.closest(".places__item").remove();
  }
}
// ФУНКЦИЯ ЛАЙКАНИЯ КАРТОЧКИ
function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
// ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ
function handleCreateCard(evt) {
  const item = { name: "", link: "" };
  evt.preventDefault();
  item.name = document.querySelector(".popup__input_type_card-name").value;
  item.link = document.querySelector(".popup__input_type_url").value;
  placesList.prepend(createCard(item, handleDelete, likeCard));
  closePopup(popupNewCard);
}

export {
  initialCards,
  placesList,
  createCard,
  handleDelete,
  likeCard,
  handleCreateCard,
};
