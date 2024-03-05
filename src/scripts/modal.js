const handleFormKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleFormKeyDown);
}

const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleFormKeyDown);
}

const waitLoading = (status, popup) => {
  if (status) {
    popup.querySelector('.popup__button').textContent = "Сохранение...";
  }
  else {
    popup.querySelector('.popup__button').textContent = "Сохранить";
  }
}

export { openModal, closeModal, waitLoading };