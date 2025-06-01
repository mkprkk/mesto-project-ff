import { popups, getPopupElementByKey } from './popupObject.js';
import { openPopup, closePopup, loadImageInPopup } from './popupCore.js';
import { submitForm, fillProfileForm } from './popupEditForm.js';

document.addEventListener('click', function(evt) {
  const target = evt.target;

  // Открытие попапа по кнопкам или картинке
  const popupKey = Object.keys(popups).find(className => target.classList.contains(className));
  if (popupKey) {
    const popupElement = getPopupElementByKey(popupKey);
    if (popupElement) {
      if (popupKey === 'card__image') {
        loadImageInPopup(evt, popupElement);
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