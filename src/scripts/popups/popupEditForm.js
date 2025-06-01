import { JakIveCusto } from '../profile.js';
import { closePopup } from './popupCore.js';

export function fillProfileForm() {
  const profileNameForm = document.querySelector('.popup__input_type_name');
  const profileDescriptionForm = document.querySelector('.popup__input_type_description');
  profileNameForm.value = JakIveCusto.name;
  profileDescriptionForm.value = JakIveCusto.description;
}

export function updateProfileFromForm() {
  const profileNameForm = document.querySelector('.popup__input_type_name');
  const profileDescriptionForm = document.querySelector('.popup__input_type_description');
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  JakIveCusto.name = profileNameForm.value;
  JakIveCusto.description = profileDescriptionForm.value;
  profileName.textContent = JakIveCusto.name;
  profileDescription.textContent = JakIveCusto.description;
}

export function submitForm(evt) {
  evt.preventDefault();
  updateProfileFromForm();
  const openedPopup = document.querySelector('.popup_is-opened');
  if (openedPopup) {
    closePopup(openedPopup);
    document.removeEventListener('submit', submitForm);
  }
}