const popups = {
  'profile__edit-button': 'popup_type_edit',
  'profile__add-button': 'popup_type_new-card',
  'card__image': 'popup_type_image'
};

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
  popupElement.addEventListener('click', handleOverlayClick);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
  popupElement.removeEventListener('click', handleOverlayClick);
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

document.addEventListener('click', function(evt) {
  const target = evt.target;

  const popupKey = Object.keys(popups).find(className => target.classList.contains(className));

    if (popupKey === 'card__image') {
    const cardImage = target.closest('.card__image');
    const popupClass = popups[popupKey];
    const popupElement = document.querySelector(`.${popupClass}`);
    if (popupElement) {
      popupElement.querySelector('.popup__image').src = cardImage.src;
      popupElement.querySelector('.popup__caption').textContent = cardImage.alt;
      openPopup(popupElement);
    }
  }

  else if (popupKey) {
    const popupClass = popups[popupKey];
    const popupElement = document.querySelector(`.${popupClass}`);
    if (popupElement) {
      openPopup(popupElement);
    } 
  } 

  if (target.classList.contains('popup__close')) {
    const popupElement = target.closest('.popup');
    if (popupElement) {
      closePopup(popupElement);
    }
  }
});