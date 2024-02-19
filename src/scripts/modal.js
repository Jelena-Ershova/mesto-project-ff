const popupEditProfile = document.querySelector('.popup_type_edit');

const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_description');

const popupAddCard = document.querySelector('.popup_type_new-card');

const cardNameInput = popupAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = popupAddCard.querySelector('.popup__input_type_url');

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

export { openModal, closeModal, popupEditProfile, popupAddCard, nameInput, jobInput, cardNameInput, cardLinkInput };