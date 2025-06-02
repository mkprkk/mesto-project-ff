import { initialCards as cards } from "../../cards/cards.js";
import { closePopup } from '../popupCore.js';
import { createCard, cardsContainer } from '../../cards/cardsRender.js';

const cardTitle = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');

export function addCardFromForm(evt) {
    evt.preventDefault();
    const cardData = {
        name: cardTitle.value,
        link: cardLink.value
    };
    cards.push(cardData);

    const newCard = createCard(cardData);
    cardsContainer.prepend(newCard);

    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
    document.removeEventListener('submit', addCardFromForm);
    cardTitle.value = '';
    cardLink.value = '';
}