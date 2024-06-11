//переменные попап
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupEditOpen = document.querySelector(".profile__edit-button");
const popupNewCardOpen = document.querySelector(".profile__add-button");
//переменные профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//переменные для редактирования профиля
const formEdit = document.forms.edit;
const formEditName = document.forms.edit.elements.name;
const formEditDescription = document.forms.edit.elements.description;
// переменные для добавления карт
const formAddCard = document.forms.newCard;

//функция открытия попап
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("click", closeModal);
  function closeModal(evt) {
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
      document.removeEventListener("click", closeModal);
    } else if (evt.target.classList.contains("popup")) {
      closePopup(popup);
      document.removeEventListener("click", closeModal);
    }
  };
  document.addEventListener("keydown", closeEsc);
  function closeEsc(evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
      document.removeEventListener("keydown", closeEsc);
    }
  }
//   formAddCard.reset();  - очистка формы
};
//функция закрытия попап
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
};
//функция открытия картинки
function openPopupImage(name, link) {
  popupImage.querySelector(".popup__image").src = link;
  popupImage.querySelector(".popup__caption").textContent = name;
  openPopup(popupImage);
};
//функция редактирования информации профиля
function editInfoProfile() {
  formEditName.value = profileTitle.textContent;
  formEditDescription.value = profileDescription.textContent;
  return;
};
//функция отправки информации профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = formEditName.value;
  profileDescription.textContent = formEditDescription.value;
  closePopup(popupEdit);
};

export {
  popupEdit,
  popupNewCard,
  popupEditOpen,
  popupNewCardOpen,
  formEdit,
  formAddCard,
  openPopup,
  closePopup,
  openPopupImage,
  editInfoProfile,
  handleFormSubmit,
};
