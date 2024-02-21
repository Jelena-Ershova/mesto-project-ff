const handleFormKeyDown = function (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

const openModal = function (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleFormKeyDown);
}

const closeModal = function (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleFormKeyDown);
}

export { openModal, closeModal };