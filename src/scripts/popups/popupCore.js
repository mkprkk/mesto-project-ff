import {
  clearValidation,
} from "../validation/validation.js";
import { validationSettings } from "../validation/validationSettings.js";

export function openPopup(popupElement) {
  const formElement = popupElement.querySelector(`.${validationSettings.formSelector}`);
  clearValidation(formElement, validationSettings);

  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
  popupElement.addEventListener("click", handleOverlayClick);
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
  popupElement.removeEventListener("click", handleOverlayClick);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function handleOverlayClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(evt.currentTarget);
  }
}
