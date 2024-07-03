import "../pages/index.css";
import { createCard, handleDelete, likeCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  infoForMe,
  getInitialCards,
  editAvatar,
  editProfile,
  postNewCard,
  deleteCardServer,
  putLikeServer,
  deleteLikeServer,
  renderLoading,
} from "./api.js";

const placesList = document.querySelector(".places__list");
//переменные профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
// const popupButton = document.querySelector(".popup__button");
//переменные для редактирования аватара
const formAvatar = document.forms.newAvatar;
const formEditLink = document.forms.newAvatar.elements.link;
const popupAvatar = document.querySelector(".popup_type_new-avatar");
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

//перебор и вставка карточек с сервера
let meID;
let newCards;
let meName;
let meAbout;
let meAvatar;
Promise.all([infoForMe(), getInitialCards()])
  .then(([meInfo, newCard]) => {
    meID = meInfo._id;
    newCards = newCard;
    meName = meInfo.name;
    meAbout = meInfo.about;
    meAvatar = meInfo.avatar;
  })
  .then(() => {
    newCards.forEach((cardData) => {
      placesList.append(
        createCard(
          cardData,
          meID,
          handleDelete,
          openImage,
          likeCard,
          deleteCardServer,
          putLikeServer,
          deleteLikeServer
        )
      );
    });
  })
  .then(() => {
    profileTitle.textContent = meName;
    profileDescription.textContent = meAbout;
  })
  .then(() => {
    profileAvatar.src = meAvatar;
  });

// функция отображения информации профиля  в попапе при клике на кнопку редактирования
function editInfoProfile() {
  formEditName.value = profileTitle.textContent;
  formEditDescription.value = profileDescription.textContent;
}
// открытие попапа аватара
profileAvatar.addEventListener("click", () => {
  openPopup(popupAvatar);
  clearValidation();
});
// открытие попапа редактирования
popupEditOpen.addEventListener("click", () => {
  openPopup(popupEdit);
  editInfoProfile();
  clearValidation();
});
// открытие попапа создания карточки
popupNewCardOpen.addEventListener("click", () => {
  openPopup(popupNewCard);
  clearValidation();
});

//функция записи ссылки на новый аватар после редактирования
function recordNewAvatar(evt) {
  evt.preventDefault();
  renderLoading(true);
  profileAvatar.src = formEditLink.value;
  // отправка  отредактированной информации профиля на сервер
  editAvatar(formEditLink);
  closePopup(popupAvatar);
  formAvatar.reset();
}
//функция записи информации профиля после редактирования
function recordNewInfoProfile(evt) {
  evt.preventDefault();
  renderLoading(true);
  profileTitle.textContent = formEditName.value;
  profileDescription.textContent = formEditDescription.value;
  // отправка  отредактированной информации профиля на сервер
  editProfile(formEditName, formEditDescription);
  closePopup(popupEdit);
}
// функция создания карточки
function handleCreateCard(evt) {
  const item = { name: "", link: "" };
  evt.preventDefault();
  renderLoading(true);
  item.name = cardName.value;
  item.link = cardLink.value;
  postNewCard(item);
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

//сохраняем изменения аватара при нажатии кнопки сохранения
formAvatar.addEventListener("submit", recordNewAvatar);
//сохраняем изменения профиля при нажатии кнопки сохранения
formEdit.addEventListener("submit", recordNewInfoProfile);
//добавляем карточку при нажатии кнопки сохранения
formAddCard.addEventListener("submit", handleCreateCard);

enableValidation({
  // formList: Array.from(document.querySelectorAll(".popup__form")),
  // inputList: Array.from(formElement.querySelectorAll(".popup__input")),
  // buttonElement: formElement.querySelector(".popup__button"),
});

