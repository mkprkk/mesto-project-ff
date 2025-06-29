import { openPopup, submitFormWrapper } from "../popupCore.js";
import { postAvatarData } from "../../requests.js";

const popupEditImage = document.querySelector(".popup_type_edit-image");
const profileImageInput = popupEditImage.querySelector(".popup__input");

export function initEditProfileImagePopup() {
  document.addEventListener("submit", (evt) =>
    submitFormWrapper(evt, updateImageFromForm)
  );
  openPopup(popupEditImage);
}

async function updateImageFromForm() {
  await postAvatarData(profileImageInput.value)
    .then((data) => {
      const profileImage = document.querySelector(".profile__image");
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      console.log("Profile image updated successfully:", data);
    })
    .catch((err) => {
      console.error(err);
    });
}
