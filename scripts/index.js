// Получение шаблона, контейнера и массива карточек
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");
let cards = initialCards;

// Функция удаления карточки
function deleteCard(element) {
  element.remove();
}

// Функция создания карточки
function createCard(cardData, delHandler) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => delHandler(cardElement));

  return cardElement;
}

// Функция рендеринга карточек
function renderCards(createHandler, delHandler) {
  cards.forEach((cardData) => {
    const renderedCard = createHandler(cardData, delHandler);
    cardsContainer.append(renderedCard);
  });
}

// Вызов рендеринга карточек
renderCards(createCard, deleteCard);