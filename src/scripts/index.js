import "../pages/index.css";
import {
  initialCards,
  placesList,
  createCard,
  handleDelete,
  likeCard,
  handleCreateCard,
} from "./cards.js";
import {
  popupEdit,
  popupNewCard,
  popupEditOpen,
  popupNewCardOpen,
  formEdit,
  formAddCard,
  openPopup,
  editInfoProfile,
  handleFormSubmit,
} from "./modal.js";
// перебор массива с карточками
initialCards.forEach((item) => {
  placesList.append(createCard(item, handleDelete, likeCard));
});
// открытие попапа редактирования
popupEditOpen.addEventListener("click", () => {
  openPopup(popupEdit);
  editInfoProfile();
});
// открытие попапа добавления
popupNewCardOpen.addEventListener("click", () => {
  openPopup(popupNewCard);
});
//сохраняем изменения при нажатии кнопки сохранения
formEdit.addEventListener("submit", handleFormSubmit);
//добавляем карточку при нажатии кнопки сохранения
formAddCard.addEventListener("submit", handleCreateCard);
//ставим лайк карточке
placesList.addEventListener("click", likeCard);

