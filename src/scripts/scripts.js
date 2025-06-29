import { initEditPopup } from "./popups/buttonHandlers/popupEditButton.js";
import { initAddPopup } from "./popups/buttonHandlers/popupAddButton.js";
import { postAvatarData } from "./api.js";
import { closePopup } from "./popups/popupCore.js";

const popupEditImage = document.querySelector(".popup_type_edit-image");
const profileImageInput = popupEditImage.querySelector(".popup__input");

function initEditProfileImagePopup() {
  document.addEventListener("submit", async (evt) =>
    await submitFormWrapper(evt, updateImageFromForm), { once: true }
  );
  openPopup(popupEditImage);
}

async function updateImageFromForm() {
  await postAvatarData(profileImageInput.value)
    .then((data) => {
      const profileImage = document.querySelector(".profile__image");
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.error(err);
    });
}

const popupButtons = {
  "profile__edit-button": initEditPopup,
  "profile__add-button": initAddPopup,
  profile__image: initEditProfileImagePopup,
};

document.addEventListener("click", popupManager);

function popupManager(evt) {
  const target = evt.target;
  const popupKey = popupButtons[target.className];
  popupKey?.();
}

export async function submitForm(callback, evt) {
  evt.preventDefault();

  const button = evt.target.querySelector(".popup__button");
  button.textContent = "Сохранение...";

  await callback(evt);

  const openedPopup = document.querySelector(".popup_is-opened");
  closePopup(openedPopup);
  button.textContent = "Готово!";

  document.removeEventListener("submit", (evt) =>
    submitFormWrapper(evt, callback)
  );
}

export async function submitFormWrapper(evt, callback, reset = true) {
  await submitForm(callback, evt);
  if (reset) {
    evt.target.reset();
  }
}

// --------------------------------------------------------------------

import { createCard, toggleIsLiked, setLikeCount } from "./card.js";
import { openPopup } from "./popups/popupCore.js";
import { getCards } from "./api.js";
import { initDeleteConfirmPopup } from "./popups/buttonHandlers/DeleteConfirmPopup.js";

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
    const selfLiked = cardData.likes.some(
      (like) => like._id === profileData._id
    );
    if (selfLiked) {
      renderedCard
        .querySelector(".card__like-button")
        .classList.add("card__like-button_is-active");
    }
    cardsContainer.append(renderedCard);
  });
}

// Вызов рендеринга карточек
renderCards(
  createCard,
  initDeleteConfirmPopup,
  toggleIsLiked,
  loadImageInPopup,
  setLikeCount
);

// --------------------------------------------------------------------

import { enableValidation, clearValidation } from "./validation/validation.js";
import { validationSettings } from "./validation/validationSettings.js";

enableValidation(validationSettings);

document.addEventListener("popupOpened", (evt) => {
  const popup = evt.detail.popup;
  const form = popup.querySelector(`.${validationSettings.formSelector}`);
  if (form) {
    clearValidation(form, validationSettings);

    const submitButton = form.querySelector(
      `.${validationSettings.submitButtonSelector}`
    );

    if (submitButton) {
      const initialText = submitButton.textContent.trim();
      if (initialText) {
        if (!submitButton.dataset.initialText) {
          submitButton.dataset.initialText = initialText;
        } else {
          submitButton.textContent = submitButton.dataset.initialText;
        }
      }
    }
  }
});

// --------------------------------------------------------------------
import { getProfileData } from "./api.js";

const name = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");

getProfileData().then((result) => {
  name.textContent = result.name;
  description.textContent = result.about;
  avatar.style.backgroundImage = `url(${result.avatar})`;
});

// --------------------------------------------------------------------
