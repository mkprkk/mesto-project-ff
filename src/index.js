// ======================= Импорт модулей и стилей =======================
import "./pages/index.css";
import {
  postAvatarData,
  getCards,
  getProfileData,
  postCardData,
  postProfileData,
} from "./scripts/api.js";
import { openPopup, closePopup } from "./scripts/popupCore.js";
import {
  createCard,
  deleteCard,
  toggleIsLiked,
  setLikeCount,
} from "./scripts/card.js";
import {
  enableValidation,
  clearValidation,
} from "./scripts/validation/validation.js";
import { validationSettings } from "./scripts/validation/validationSettings.js";

// ======================================================================

// ======================= Конфиг для index.js =======================

const config = {
  selectors: {
    popupEditImage: ".popup_type_edit-image",
    profileImageInput: ".popup_type_edit-image .popup__input",
    profileName: ".profile__title",
    profileDescription: ".profile__description",
    cardsContainer: ".places__list",
    popupEdit: ".popup_type_edit",
    addCardForm: ".popup_type_new-card",
    deleteConfirmForm: ".popup_type_delete-card",
    profileNameForm: ".popup__input_type_name",
    profileDescriptionForm: ".popup__input_type_description",
    cardTitle: ".popup__input_type_card-name",
    cardLink: ".popup__input_type_url",
    profileImage: ".profile__image",
    popupImage: ".popup__image",
    popupCaption: ".popup__caption",
    popupImageType: ".popup_type_image",
    cardDeleteButton: ".card__delete-button",
    cardLikeButton: ".card__like-button",
    popupIsOpened: ".popup_is-opened",
    popupButton: ".popup__button",
    cardLikeButtonIsActive: ".card__like-button_is-active",
  },
  popupButtons: {
    edit: "profile__edit-button",
    add: "profile__add-button",
    image: "profile__image",
  },
  validationSettingsKey: "validationSettings",
};

// ===================================================================

// ======================= DOM-элементы =======================
const popupEditImage = document.querySelector(config.selectors.popupEditImage);
const profileImageInput = document.querySelector(
  config.selectors.profileImageInput
);
const profileName = document.querySelector(config.selectors.profileName);
const profileDescription = document.querySelector(
  config.selectors.profileDescription
);
const cardsContainer = document.querySelector(config.selectors.cardsContainer);

// ======================================================================

// ======================= Управление попапами =======================
const popupButtons = {
  [config.popupButtons.edit]: initEditPopup,
  [config.popupButtons.add]: initAddPopup,
  [config.popupButtons.image]: initEditProfileImagePopup,
};

function popupManager(evt) {
  const target = evt.target;
  const popupKey = popupButtons[target.className];
  popupKey?.();
}

document.addEventListener("click", popupManager);

// ======================================================================

// ======================= Работа с формами =======================
async function updateImageFromForm() {
  await postAvatarData(profileImageInput.value)
    .then((data) => {
      const profileImage = document.querySelector(
        config.selectors.profileImage
      );
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.error(err);
    });
}

async function submitForm(callback, evt) {
  evt.preventDefault();
  await callback(evt);
  const openedPopup = document.querySelector(config.selectors.popupIsOpened);
  closePopup(openedPopup);
}

async function submitFormWrapper(evt, callback, reset = true) {
  const button = evt.target.querySelector(config.selectors.popupButton);
  button.textContent = "Сохранение...";
  try {
    await submitForm(callback, evt);
    if (reset) {
      evt.target.reset();
    }
    button.textContent = "Готово!";
    await new Promise((resolve) => setTimeout(resolve, 800));
  } catch (error) {
    console.error(error);
  } finally {
    if (button.dataset.initialText) {
      button.textContent = button.dataset.initialText;
    }
  }
}

async function addCardFromForm() {
  const cardTitle = document.querySelector(config.selectors.cardTitle);
  const cardLink = document.querySelector(config.selectors.cardLink);
  const cardData = {
    name: cardTitle.value,
    link: cardLink.value,
  };

  await postCardData(cardData)
    .then((newCardData) => {
      createCard(
        newCardData,
        toggleIsLiked,
        initDeleteConfirmPopup,
        loadImageInPopup
      );
      renderCards(
        createCard,
        initDeleteConfirmPopup,
        toggleIsLiked,
        loadImageInPopup,
        setLikeCount
      );
    })
    .catch((err) => {
      console.error(err);
    });
}

// ======================================================================

// ======================= Инициализация попапов =======================
function initDeleteConfirmPopup(element) {
  const deleteConfirmForm = document.querySelector(
    config.selectors.deleteConfirmForm
  );
  deleteConfirmForm.onsubmit = async (evt) => {
    await submitFormWrapper(evt, (evt) => deleteCard(element, evt));
  };
  openPopup(deleteConfirmForm);
}

function initEditProfileImagePopup() {
  popupEditImage.onsubmit = async (evt) =>
    await submitFormWrapper(evt, updateImageFromForm);
  openPopup(popupEditImage);
}

function initEditPopup() {
  const popupEdit = document.querySelector(config.selectors.popupEdit);
  fillProfileForm();
  popupEdit.onsubmit = async (evt) =>
    await submitFormWrapper(evt, updateProfileFromForm, false);
  openPopup(popupEdit);
}

function initAddPopup() {
  const addCardForm = document.querySelector(config.selectors.addCardForm);
  addCardForm.onsubmit = async (evt) =>
    await submitFormWrapper(evt, addCardFromForm);
  openPopup(addCardForm);
}

// ======================================================================

// ======================= Работа с профилем =======================
function fillProfileForm() {
  const profileNameForm = document.querySelector(
    config.selectors.profileNameForm
  );
  const profileDescriptionForm = document.querySelector(
    config.selectors.profileDescriptionForm
  );

  profileNameForm.value = profileName.textContent;
  profileDescriptionForm.value = profileDescription.textContent;
}

async function updateProfileFromForm() {
  const profileNameForm = document.querySelector(
    config.selectors.profileNameForm
  );
  const profileDescriptionForm = document.querySelector(
    config.selectors.profileDescriptionForm
  );
  await postProfileData(profileNameForm.value, profileDescriptionForm.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch((err) => {
      console.error(err);
    });
}

// ======================================================================

// ======================= Работа с карточками =======================
function loadImageInPopup(imageElement) {
  document.querySelector(config.selectors.popupImage).src = imageElement.src;
  document.querySelector(config.selectors.popupCaption).textContent =
    imageElement.alt;
  openPopup(document.querySelector(config.selectors.popupImageType));
}

async function renderCards(
  createHandler,
  delHandler,
  likeHandler,
  loadHandler,
  setLikeCount
) {
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }
  const profileData = await getProfileData().catch((err) => {
    console.error(err);
  });
  const cards = await getCards()
    .then((result) => {
      return Promise.all(
        result.map(async (card) => {
          return {
            name: card.name,
            link: card.link,
            likes: card.likes,
            ownerId: card.owner._id,
            id: card._id,
          };
        })
      );
    })
    .catch((err) => {
      console.error(err);
    });
  cards.forEach((cardData) => {
    const renderedCard = createHandler(
      cardData,
      likeHandler,
      delHandler,
      loadHandler
    );
    if (cardData.ownerId !== profileData._id) {
      renderedCard.querySelector(config.selectors.cardDeleteButton).remove();
    }
    setLikeCount(
      renderedCard.querySelector(config.selectors.cardLikeButton),
      cardData.likes.length
    );
    const selfLiked = cardData.likes.some(
      (like) => like._id === profileData._id
    );
    if (selfLiked) {
      renderedCard
        .querySelector(config.selectors.cardLikeButton)
        .classList.add(config.selectors.cardLikeButtonIsActive);
    }
    cardsContainer.append(renderedCard);
  });
}

renderCards(
  createCard,
  initDeleteConfirmPopup,
  toggleIsLiked,
  loadImageInPopup,
  setLikeCount
);

// ======================================================================

// ======================= Валидация форм =======================
enableValidation(validationSettings);

document.addEventListener("popupOpened", (evt) => {
  const popup = evt.detail.popup;
  const form = popup.querySelector(`.${validationSettings.formSelector}`);
  if (form) {
    clearValidation(form, validationSettings);

    const submitButton = form.querySelector(
      `.${validationSettings.submitButtonSelector}`
    );

    if (submitButton) {
      const initialText = submitButton.textContent.trim();
      if (initialText) {
        if (!submitButton.dataset.initialText) {
          submitButton.dataset.initialText = initialText;
        } else {
          submitButton.textContent = submitButton.dataset.initialText;
        }
      }
    }
  }
});

// ======================================================================

// ======================= Загрузка данных профиля при инициализации =======================
getProfileData()
  .then((result) => {
    const name = document.querySelector(config.selectors.profileName);
    const description = document.querySelector(
      config.selectors.profileDescription
    );
    const avatar = document.querySelector(config.selectors.profileImage);

    name.textContent = result.name;
    description.textContent = result.about;
    avatar.style.backgroundImage = `url(${result.avatar})`;
  })
  .catch((err) => {
    console.error(err);
  });

// ======================================================================
