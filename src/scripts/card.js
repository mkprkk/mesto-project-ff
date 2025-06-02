const cardTemplate = document.querySelector("#card-template").content;

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


