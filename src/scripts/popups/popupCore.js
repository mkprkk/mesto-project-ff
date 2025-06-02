export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
  popupElement.addEventListener("click", handleOverlayClick);
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
  popupElement.removeEventListener("click", handleOverlayClick);
}

export function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

export function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

export function loadImageInPopup(evt, popupElement) {
  const target = evt.target;
  const cardImage = target.closest(".card__image");
  popupElement.querySelector(".popup__image").src = cardImage.src;
  popupElement.querySelector(".popup__caption").textContent = cardImage.alt;
}
