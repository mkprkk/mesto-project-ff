import "./popups/popupCore.js";
import { initEditPopup } from "./popups/buttonHandlers/popupEditButton.js";
import { initAddPopup } from "./popups/buttonHandlers/popupAddButton.js";
import { initEditProfileImagePopup } from "./popups/buttonHandlers/popupEditProfileImage.js";


const popupButtons = {
  "profile__edit-button": initEditPopup,
  "profile__add-button": initAddPopup,
  "profile__image": initEditProfileImagePopup,
};

document.addEventListener("click", popupManager);

function popupManager(evt) {
  const target = evt.target;
  const popupKey = popupButtons[target.className];
  popupKey?.();
}

// --------------------------------------------------------------------

import { createCard, deleteCard, toggleIsLiked, setLikeCount } from "./card.js";
import { openPopup } from "./popups/popupCore.js";
import { getCards } from "./requests.js";

// Получение шаблона, контейнера и массива карточек
export const cardsContainer = document.querySelector(".places__list");

export function loadImageInPopup(imageElement) {
  document.querySelector(".popup__image").src = imageElement.src;
  document.querySelector(".popup__caption").textContent = imageElement.alt;
  openPopup(document.querySelector(".popup_type_image"));
}

// Функция рендеринга карточек
async function renderCards(
  createHandler,
  delHandler,
  likeHandler,
  loadHandler,
  setLikeCount
) {
  const profileData = await getProfileData();
  const cards = await getCards();
  cards.forEach((cardData) => {
    const renderedCard = createHandler(
      cardData,
      likeHandler,
      delHandler,
      loadHandler
    );
    if (cardData.ownerId !== profileData._id) {
      renderedCard.querySelector(".card__delete-button").remove();
    }
    setLikeCount(
      renderedCard.querySelector(".card__like-button"),
      cardData.likes.length
    );
    const selfLiked = cardData.likes.some((like) => like._id === profileData._id);
    if (selfLiked) {
      renderedCard.querySelector(".card__like-button").classList.add("card__like-button_is-active");
    }
    cardsContainer.append(renderedCard);
  });
}

// Вызов рендеринга карточек
renderCards(
  createCard,
  deleteCard,
  toggleIsLiked,
  loadImageInPopup,
  setLikeCount
);

// --------------------------------------------------------------------

import { enableValidation } from "./validation/validation.js";
import { validationSettings } from "./validation/validationSettings.js";

enableValidation(validationSettings);

// --------------------------------------------------------------------
import { getProfileData } from "./requests.js";

getProfileData();

// --------------------------------------------------------------------
