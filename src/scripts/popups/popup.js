import { JakIveCusto } from '../profile.js';

const popups = {
  'profile__edit-button': 'popup_type_edit',
  'profile__add-button': 'popup_type_new-card',
  'card__image': 'popup_type_image'
};

function addPopupListeners(popupElement) {
  document.addEventListener('keydown', handleEscape);
  popupElement.addEventListener('click', handleOverlayClick);
}

function removePopupListeners(popupElement) {
  document.removeEventListener('keydown', handleEscape);
  popupElement.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('submit', submitForm);
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  addPopupListeners(popupElement);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  removePopupListeners(popupElement);
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

function getPopupElementByKey(popupKey) {
  const popupClass = popups[popupKey];
  return document.querySelector(`.${popupClass}`);
}

function fillProfileForm() {
  const profileNameForm = document.querySelector('.popup__input_type_name');
  const profileDescriptionForm = document.querySelector('.popup__input_type_description');
  profileNameForm.value = JakIveCusto.name;
  profileDescriptionForm.value = JakIveCusto.description;
}

function updateProfileFromForm() {
  const profileNameForm = document.querySelector('.popup__input_type_name');
  const profileDescriptionForm = document.querySelector('.popup__input_type_description');
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  JakIveCusto.name = profileNameForm.value;
  JakIveCusto.description = profileDescriptionForm.value;
  profileName.textContent = JakIveCusto.name;
  profileDescription.textContent = JakIveCusto.description;
}

function submitForm(evt) {
  evt.preventDefault();
  updateProfileFromForm();
  const openedPopup = document.querySelector('.popup_is-opened');
  if (openedPopup) {
    closePopup(openedPopup);
  }
}

document.addEventListener('click', function(evt) {
  const target = evt.target;

  // Открытие попапа по кнопкам или картинке
  const popupKey = Object.keys(popups).find(className => target.classList.contains(className));
  if (popupKey) {
    const popupElement = getPopupElementByKey(popupKey);
    if (popupElement) {
      if (popupKey === 'card__image') {
        const cardImage = target.closest('.card__image');
        popupElement.querySelector('.popup__image').src = cardImage.src;
        popupElement.querySelector('.popup__caption').textContent = cardImage.alt;
      } else if (popupKey === 'profile__edit-button') {
        fillProfileForm();
        document.addEventListener('submit', submitForm);
      }
      openPopup(popupElement);
    }
  }

  // Закрытие попапа по крестику
  if (target.classList.contains('popup__close')) {
    const popupElement = target.closest('.popup');
    if (popupElement) {
      closePopup(popupElement);
    }
  }
});