import "../pages/index.css";
import { createCard, handleDelete, likeCard, openImage } from "./card.js";
import { initialCards } from "./cards.js";
import {
  popupEdit,
  popupNewCard,
  popupEditOpen,
  popupNewCardOpen,
  openPopup,
  closePopup,
} from "./modal.js";

const placesList = document.querySelector(".places__list");
//переменные профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//переменные для редактирования профиля
const formEdit = document.forms.edit;
const formEditName = document.forms.edit.elements.name;
const formEditDescription = document.forms.edit.elements.description;
// переменные для добавления карт
const formAddCard = document.forms.newCard;
const cardName = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");
//переменные картинки
const popupImage = document.querySelector(".popup_type_image");
// перебор массива с карточками
initialCards.forEach((obj) => {
  placesList.append(createCard(obj, handleDelete, openImage, likeCard));
});
// открытие попапа редактирования
popupEditOpen.addEventListener("click", () => {
  openPopup(popupEdit);
  editInfoProfile();
});
//функция редактирования информации профиля
function editInfoProfile() {
  formEditName.value = profileTitle.textContent;
  formEditDescription.value = profileDescription.textContent;
}
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
//открытие картинки
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__image")) {
    openPopup(popupImage);
  }
});
//сохраняем изменения профиля при нажатии кнопки сохранения
formEdit.addEventListener("submit", recordNewInfoProfile);
//добавляем карточку при нажатии кнопки сохранения
formAddCard.addEventListener("submit", handleCreateCard);
