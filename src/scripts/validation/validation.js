const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-error-message`
  );
  errorElement.textContent = errorMessage;
  errorElement.classList.add("on-error-message");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-error-message`
  );
  errorElement.classList.remove("on-error-message");
  errorElement.textContent = "";
};

export const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    let validityState = inputElement.validity;
    if (validityState.valueMissing) {
      inputElement.setCustomValidity("Вы пропустили это поле.");
    } else if (validityState.tooShort) {
      inputElement.setCustomValidity(
        `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${inputElement.value.length}.`
      );
    } else if (validityState.patternMismatch) {
      inputElement.setCustomValidity(
        "Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы."
      );
    } else inputElement.setCustomValidity("");

    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button_inactive");
  }
};
