const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
initialCards.forEach(element => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = element.name;
  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__image").alt = element.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", evt => {
      evt.target.parentElement.remove();
    });
  placesList.append(cardElement);
});
// @todo: Темплейт карточки V
// @todo: DOM узлы V
// @todo: Функция создания карточки V
// @todo: Функция удаления карточки V
// @todo: Вывести карточки на страницу V
