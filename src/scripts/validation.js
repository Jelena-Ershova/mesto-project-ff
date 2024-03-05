const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, inputErrorClass, errorClass ) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

const setEventListeners = (formElement, objConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(objConfig.inputSelector));
  const buttonElement = formElement.querySelector(objConfig.submitButtonSelector);
  const inactiveButtonClass = objConfig.inactiveButtonClass;
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, objConfig.inputErrorClass, objConfig.errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

export const enableValidation = (objConfig) => {
  const formList = Array.from(document.querySelectorAll(objConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, objConfig);
  });
}

export const clearValidation = (formElement, objConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(objConfig.inputSelector));
  const buttonElement = formElement.querySelector(objConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity("");
    hideInputError(formElement, inputElement, objConfig.inputErrorClass, objConfig.errorClass);
  });
  toggleButtonState(inputList, buttonElement, objConfig.inactiveButtonClass);
}