import { initialCards as cards } from "../../database/cards.js";
import { openPopup, closePopup } from "../popupCore.js";
import {
  createCard,
  deleteCard,
  toggleIsLiked,
  cardsContainer,
  loadImageInPopup,
} from "../../card.js";

const cardTitle = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");

function addCardFromForm(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardTitle.value,
    link: cardLink.value,
  };
  cards.push(cardData);

  const newCard = createCard(
    cardData,
    toggleIsLiked,
    deleteCard,
    loadImageInPopup
  );
  cardsContainer.prepend(newCard);

  const openedPopup = document.querySelector(".popup_is-opened");
  closePopup(openedPopup);
  document.removeEventListener("submit", addCardFromForm);
  cardTitle.value = "";
  cardLink.value = "";
}

export function initAddPopup() {
  document.addEventListener("submit", addCardFromForm);
  openPopup(document.querySelector(".popup_type_new-card"));
}
