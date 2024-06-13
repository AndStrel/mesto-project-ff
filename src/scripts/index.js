import "../pages/index.css";
import { createCard, handleDelete, likeCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup } from "./modal.js";

const placesList = document.querySelector(".places__list");
//переменные профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//переменные для редактирования профиля
const formEdit = document.forms.edit;
const formEditName = document.forms.edit.elements.name;
const formEditDescription = document.forms.edit.elements.description;
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditOpen = document.querySelector(".profile__edit-button");
// переменные для добавления карт
const formAddCard = document.forms.newCard;
const cardName = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardOpen = document.querySelector(".profile__add-button");
//переменные для открытия попапа картинки
const popupImage = document.querySelector(".popup_type_image");
const popupImagePicture = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

// перебор массива с карточками
initialCards.forEach((cardData) => {
  placesList.append(createCard(cardData, handleDelete, openImage, likeCard));
});

//функция редактирования информации профиля
function editInfoProfile() {
  formEditName.value = profileTitle.textContent;
  formEditDescription.value = profileDescription.textContent;
}
// открытие попапа редактирования
popupEditOpen.addEventListener("click", () => {
  openPopup(popupEdit);
  editInfoProfile();
});

//функция записи информации профиля после редактирования
function recordNewInfoProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = formEditName.value;
  profileDescription.textContent = formEditDescription.value;
  closePopup(popupEdit);
}
// открытие попапа создания карточки
popupNewCardOpen.addEventListener("click", () => {
  openPopup(popupNewCard);
});
// функция создания карточки
function handleCreateCard(evt) {
  const item = { name: "", link: "" };
  evt.preventDefault();
  item.name = cardName.value;
  item.link = cardLink.value;
  placesList.prepend(createCard(item, handleDelete, openImage, likeCard));
  closePopup(popupNewCard);
  formAddCard.reset();
}
//функция передачи параметров при открытия картинки
function openImage(name, link) {
  popupImagePicture.src = link;
  popupImagePicture.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}
//сохраняем изменения профиля при нажатии кнопки сохранения
formEdit.addEventListener("submit", recordNewInfoProfile);
//добавляем карточку при нажатии кнопки сохранения
formAddCard.addEventListener("submit", handleCreateCard);
