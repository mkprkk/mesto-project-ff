import { deleteCardData, toggleLike } from "./requests.js";

const cardTemplate = document.querySelector("#card-template").content;

// Функция удаления карточки
export async function deleteCard(element) {
  await deleteCardData(element.id);
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
  cardElement.id = cardData.id;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => delHandler(cardElement));

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => handleLike(likeButton));

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => loadHandler(cardImage));

  return cardElement;
}

// Функция переключения состояния лайка
export async function toggleIsLiked(heart) {
  const parentItem = heart.closest(".places__item");
  const heartButton = parentItem.querySelector(".card__like-button");
  const isLiked = heart.classList.contains("card__like-button_is-active");
  const response = await toggleLike(parentItem.id, isLiked);
  heart.classList.toggle("card__like-button_is-active");
  setLikeCount(heartButton, response.likes.length);
}

export function setLikeCount(heart, count) {
  heart.style.setProperty("--like-count", `"${count}"`);
}
