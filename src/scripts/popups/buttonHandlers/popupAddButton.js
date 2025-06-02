import { openPopup, closePopup } from "../popupCore.js";
import { loadImageInPopup, cardsContainer } from "../../scripts.js";
import {
  createCard,
  deleteCard,
  toggleIsLiked,
} from "../../card.js";

const cardTitle = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");

function addCardFromForm(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardTitle.value,
    link: cardLink.value,
  };

  const newCard = createCard(
    cardData,
    toggleIsLiked,
    deleteCard,
    loadImageInPopup
  );
  cardsContainer.prepend(newCard);

  document.removeEventListener("submit", addCardFromForm);
  const openedPopup = document.querySelector(".popup_is-opened");
  closePopup(openedPopup);

  evt.target.reset();
}

export function initAddPopup() {
  document.addEventListener("submit", addCardFromForm);
  openPopup(document.querySelector(".popup_type_new-card"));
}
