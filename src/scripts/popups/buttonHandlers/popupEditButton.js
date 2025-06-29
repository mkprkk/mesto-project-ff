import { openPopup } from "../popupCore.js";
import { postProfileData } from "../../api.js";
import { submitFormWrapper } from "../../scripts.js";

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupEdit = document.querySelector(".popup_type_edit");

function fillProfileForm() {
  const profileNameForm = document.querySelector(".popup__input_type_name");
  const profileDescriptionForm = document.querySelector(
    ".popup__input_type_description"
  );

  profileNameForm.value = profileName.textContent;
  profileDescriptionForm.value = profileDescription.textContent;
}

async function updateProfileFromForm() {
  const profileNameForm = document.querySelector(".popup__input_type_name");
  const profileDescriptionForm = document.querySelector(
    ".popup__input_type_description"
  );
  await postProfileData(profileNameForm.value, profileDescriptionForm.value).then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
  })
}

export function initEditPopup() {
  fillProfileForm();
  document.addEventListener("submit", async (evt) => await submitFormWrapper(evt, updateProfileFromForm, false), { once: true });
  openPopup(popupEdit);
}
