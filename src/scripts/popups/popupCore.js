import { clearValidation } from "../validation/validation.js";
import { validationSettings } from "../validation/validationSettings.js";

export function openPopup(popupElement) {
  const formElement = popupElement.querySelector(
    `.${validationSettings.formSelector}`
  );
  clearValidation(formElement, validationSettings);

  const submitButton = popupElement.querySelector(".popup__button");

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

export async function submitForm(callback, evt) {
  evt.preventDefault();

  const button = evt.target.querySelector(".popup__button");
  button.textContent = "Сохранение...";

  await callback(evt);

  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    closePopup(openedPopup);
  }
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
