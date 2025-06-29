import { deleteCard } from "../../card.js";
import { openPopup, submitFormWrapper } from "../popupCore.js";

export function initDeleteConfirmPopup(element) {
  const deleteConfirmPopup = document.querySelector(".popup_type_delete-card");
  document.addEventListener("submit", async (evt) => {
    await submitFormWrapper(evt, (evt) => deleteCard(element, evt), {
      once: true,
    });
  });
  openPopup(deleteConfirmPopup);
}
