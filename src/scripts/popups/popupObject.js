export const popups = {
  'profile__edit-button': 'popup_type_edit',
  'profile__add-button': 'popup_type_new-card',
  'card__image': 'popup_type_image'
};

export function getPopupElementByKey(popupKey) {
  const popupClass = popups[popupKey];
  return document.querySelector(`.${popupClass}`);
}