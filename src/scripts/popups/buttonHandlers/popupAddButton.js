import { openPopup } from "../popupCore.js";
import { loadImageInPopup, submitFormWrapper } from "../../scripts.js";
import { createCard, deleteCard, toggleIsLiked } from "../../card.js";
import { postCardData } from "../../api.js";

const cardTitle = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");
const popupAddCard = document.querySelector(".popup_type_new-card");

async function addCardFromForm() {
  const cardData = {
    name: cardTitle.value,
    link: cardLink.value,
  };

  await postCardData(cardData)
    .then((newCardData) => {
      const newCard = createCard(
        newCardData,
        toggleIsLiked,
        deleteCard,
        loadImageInPopup
      );
      location.reload();
    })
    .catch((err) => {
      console.error(err);
    });
}

export function initAddPopup() {
  document.addEventListener("submit", async (evt) => await submitFormWrapper(evt, addCardFromForm), { once: true });
  openPopup(popupAddCard);
}
