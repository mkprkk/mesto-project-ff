import { JakIveCusto } from "../../database/profile.js";
import { openPopup, closePopup } from "../popupCore.js";

function fillProfileForm() {
  const profileNameForm = document.querySelector(".popup__input_type_name");
  const profileDescriptionForm = document.querySelector(
    ".popup__input_type_description"
  );

  profileNameForm.value = JakIveCusto.name;
  profileDescriptionForm.value = JakIveCusto.description;
}

function updateProfileFromForm() {
  const profileNameForm = document.querySelector(".popup__input_type_name");
  const profileDescriptionForm = document.querySelector(
    ".popup__input_type_description"
  );
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  JakIveCusto.name = profileNameForm.value;
  JakIveCusto.description = profileDescriptionForm.value;
  profileName.textContent = JakIveCusto.name;
  profileDescription.textContent = JakIveCusto.description;
}

function submitForm(evt) {
  evt.preventDefault();
  updateProfileFromForm();
  document.removeEventListener("submit", submitForm);
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    closePopup(openedPopup);
  }
}

export function initEditPopup() {
  fillProfileForm();
  document.addEventListener("submit", submitForm);
  openPopup(document.querySelector(".popup_type_edit"));
}
