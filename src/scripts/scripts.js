import "./popups/popupCore.js";
import { initEditPopup } from "./popups/buttonHandlers/popupEditButton.js";
import { initAddPopup } from "./popups/buttonHandlers/popupAddButton.js";

const popupButtons = {
  "profile__edit-button": initEditPopup,
  "profile__add-button": initAddPopup,
};

document.addEventListener("click", popupManager);

function popupManager(evt) {
  const target = evt.target;
  const popupKey = popupButtons[target.className];
    popupKey?.();
  }

// --------------------------------------------------------------------

import {createCard, deleteCard, toggleIsLiked } from "./card.js";

// Получение шаблона, контейнера и массива карточек
export const cardsContainer = document.querySelector(".places__list");
import { initialCards as cards } from "./database/cards.js";
import { openPopup } from "./popups/popupCore.js";

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

// --------------------------------------------------------------------

import { enableValidation } from "./validation/validation.js";
import { validationSettings } from "./validation/validationSettings.js";

enableValidation(validationSettings);

