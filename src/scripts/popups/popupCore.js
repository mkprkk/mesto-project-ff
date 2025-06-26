import { checkInputValidity, toggleButtonState } from "../validation/validation.js";

export function openPopup(popupElement) {
  const popupInputs = Array.from(
    popupElement.querySelectorAll(".popup__input")
  );
  const popupForm = popupElement.querySelector(".popup__form");
  popupInputs.forEach((inputElement) => {
    checkInputValidity(popupForm, inputElement);
  });

  const buttonElement = popupForm.querySelector(".popup__button");
  toggleButtonState(popupInputs, buttonElement);

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
