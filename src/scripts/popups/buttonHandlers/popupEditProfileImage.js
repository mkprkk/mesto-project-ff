import { openPopup, submitFormWrapper } from "../popupCore.js";
import { postAvatarData } from "../../api.js";

const popupEditImage = document.querySelector(".popup_type_edit-image");
const profileImageInput = popupEditImage.querySelector(".popup__input");

export function initEditProfileImagePopup() {
  document.addEventListener("submit", async (evt) =>
    await submitFormWrapper(evt, updateImageFromForm), { once: true }
  );
  openPopup(popupEditImage);
}

async function updateImageFromForm() {
  await postAvatarData(profileImageInput.value)
    .then((data) => {
      const profileImage = document.querySelector(".profile__image");
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.error(err);
    });
}
