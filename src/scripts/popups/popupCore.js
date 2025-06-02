import { initEditPopup } from "./buttonHandlers/popupEditButton.js";
import { initAddPopup } from "./buttonHandlers/popupAddButton.js";

// Так как обработчик попапа на картинке вешается при создании - делать ему здесь нечего
export const popupButtons = {
  "profile__edit-button": initEditPopup,
  "profile__add-button": initAddPopup,
};

document.addEventListener("click", popupManager);

export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
  popupElement.addEventListener("click", handleOverlayClick);
  popupElement.addEventListener("click", handleCrossClick);
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
  popupElement.removeEventListener("click", handleOverlayClick);
  popupElement.removeEventListener("click", handleCrossClick);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function handleCrossClick(evt) {
  const target = evt.target;
  if (target.classList.contains("popup__close")) {
    const popupElement = target.closest(".popup");
    if (popupElement) {
      closePopup(popupElement);
    }
  }
}

function getPopupElementByKey(popupKey) {
  return popupButtons[popupKey];
}

function popupManager(evt) {
  const target = evt.target;
  const popupKey = getPopupElementByKey(target.className);
  if (popupKey) {
    popupKey();
  }
}
