const cardTemplate = document.querySelector("#card-template").content;

// ФУНКЦИЯ СОЗДАНИЯ КАРТОЧЕК ИЗ ШАБЛОНА
function createCard(
  cardData,
  meID,
  handleDelete,
  openImage,
  likeCard,
  deleteCardServer,
  putLikeServer,
  deleteLikeServer
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikes = cardElement.querySelector(".card__like-counter");
  const cardId = cardData._id;
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikes.textContent = cardData.likes.length;
  if (cardData.likes.some((item) => item._id === meID)) {
    cardElement
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
    cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => {
        likeCard(evt);
        deleteLikeServer(cardId);
      });
  } else {
    cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => {
        likeCard(evt);
        putLikeServer(cardId);
      });
  }
  if (meID !== cardData.owner._id) {
    cardElement
      .querySelector(".card__delete-button")
      .classList.add("card__delete-button_hidden");
  }
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      handleDelete(cardElement);
      deleteCardServer(cardId);
    });
  if (meID !== cardData.owner._id) {
    cardElement
      .querySelector(".card__delete-button")
      .classList.add("card__delete-button_hidden");
  }
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

export { createCard, handleDelete, likeCard };
