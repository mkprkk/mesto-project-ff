// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const placeList = document.querySelector(".places__list");

function deleteCard(element) {
  const deleteButton = element.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => element.remove());
}

function renderCards(cards, delHandler) {
  cards.forEach((cardData) => {
    const cardElement = cardTemplate
      .querySelector(".places__item")
      .cloneNode(true);
      
    cardElement.querySelector(".card__image").src = cardData.link;
    cardElement.querySelector(".card__title").textContent = cardData.name;

    delHandler(cardElement);

    placeList.append(cardElement);
  });
}

renderCards(initialCards, deleteCard);
