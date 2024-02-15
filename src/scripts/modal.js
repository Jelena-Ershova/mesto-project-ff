import { createCard, removeCard, likeCard } from "./cards.js";
import { placesList, placesItem } from "./index.js";

const popupEditProfile = document.querySelector('.popup_type_edit');

const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_description');

const popupAddCard = document.querySelector('.popup_type_new-card');

const cardNameInput = popupAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = popupAddCard.querySelector('.popup__input_type_url');

const popupImage = document.querySelector('.popup_type_image');

const handleFormClick = function (evt) {
  const popupOpened = evt.currentTarget;
  const buttonClose = popupOpened.querySelector('.popup__close');
  if (evt.target === popupOpened || evt.target === buttonClose) {
    closeModal(popupOpened);
  }
}

const handleFormKeyDown = function (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

export const openModal = function (evt) {
  let popup;
  switch (evt.target.classList.value) {
    case 'profile__edit-button':
      popup = popupEditProfile;
      console.log(popup.elements);
      nameInput.value = document.querySelector('.profile__title').textContent;
      jobInput.value = document.querySelector('.profile__description').textContent;
      break;
    case 'profile__add-button':
      popup = popupAddCard;
      break;
    case 'card__image':
      popup = popupImage;
      let image = popup.querySelector('.popup__image');
      image.src = evt.currentTarget.src;
      image.alt = evt.currentTarget.alt;
      break;
  }

  popup.classList.add('popup_is-opened');

  popup.addEventListener('click', handleFormClick);
  document.addEventListener('keydown', handleFormKeyDown);

  if (popup != popupImage) {
    popup.addEventListener('submit', handleFormSubmit);
  }
}

const closeModal = function (popup) {
  popup.classList.remove('popup_is-opened');

  popup.removeEventListener('click', handleFormClick);
  document.removeEventListener('keydown', handleFormKeyDown);
  popup.removeEventListener('submit', handleFormSubmit);

  if (popup != popupImage) {
    popup.removeEventListener('submit', handleFormSubmit);
  }
}

const handleFormSubmit = function (evt) {
  evt.preventDefault();
  if (evt.currentTarget === popupEditProfile) {

    let name = nameInput.value;
    let job = jobInput.value;

    document.querySelector('.profile__title').textContent = name;
    document.querySelector('.profile__description').textContent = job;
  }
  else if (evt.currentTarget === popupAddCard) {

    let cardName = cardNameInput.value;
    let cardLink = cardLinkInput.value;

    placesList.prepend(createCard(placesItem, cardName, cardLink, removeCard, likeCard, openModal));
  }
  evt.target.reset();
  closeModal(evt.currentTarget);
}