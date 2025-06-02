// Получение шаблона, контейнера и массива карточек
const cardTemplate = document.querySelector("#card-template").content;
export const cardsContainer = document.querySelector(".places__list");
import { initialCards as cards } from "./database/cards.js";
import { openPopup } from "./popups/popupCore.js";

// Функция удаления карточки
export function deleteCard(element) {
  element.remove();
}

// Функция создания карточки
export function createCard(cardData, handleLike, delHandler, loadHandler) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => delHandler(cardElement));

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => handleLike(likeButton));

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => loadHandler(cardImage));

  return cardElement;
}

// Функция переключения состояния лайка
export function toggleIsLiked(heart) {
  heart.classList.toggle("card__like-button_is-active");
}

export function loadImageInPopup(imageElement) {
  document.querySelector(".popup__image").src = imageElement.src;
  document.querySelector(".popup__caption").textContent = imageElement.alt;
  openPopup(document.querySelector(".popup_type_image"));
}

// Функция рендеринга карточек
function renderCards(createHandler, delHandler, likeHandler, loadHandler) {
  cards.forEach((cardData) => {
    const renderedCard = createHandler(
      cardData,
      likeHandler,
      delHandler,
      loadHandler
    );
    cardsContainer.append(renderedCard);
  });
}

// Вызов рендеринга карточек
renderCards(createCard, deleteCard, toggleIsLiked, loadImageInPopup);
