
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error-message`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
  inputElement.classList.add(settings.inputErrorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error-message`);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
  inputElement.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, settings) => {
  inputElement.setCustomValidity("");

  if (!inputElement.validity.valid) {
    const validityState = inputElement.validity;

    if (validityState.valueMissing) {
      inputElement.setCustomValidity("Вы пропустили это поле.");
    } else if (validityState.tooShort) {
      inputElement.setCustomValidity(
        `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${inputElement.value.length}.`
      );
    } else if (validityState.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else if (validityState.typeMismatch) {
      inputElement.setCustomValidity("Введите адрес сайта.");
    }

    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(`.${settings.inputSelector}`));
  const buttonElement = formElement.querySelector(`.${settings.submitButtonSelector}`);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(`.${settings.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

export const clearValidation = (formElement, settings) => {
  if (!formElement) return; 
  const inputList = Array.from(formElement.querySelectorAll(`.${settings.inputSelector}`));
  const buttonElement = formElement.querySelector(`.${settings.submitButtonSelector}`);

  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, settings);
    hideInputError(formElement, inputElement, settings);
  });

  toggleButtonState(inputList, buttonElement, settings);
}
