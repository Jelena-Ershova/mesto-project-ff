import '../pages/index.css';

import { initialCards } from "./cards.js"

import { createCard, removeCard, likeCard, placesItem } from "./card.js"

import { openModal, closeModal } from "./modal.js";

// @todo: DOM узлы

const profile = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const buttonEditProfile = document.querySelector('.profile__edit-button');

const buttonAddCard = document.querySelector('.profile__add-button');

const placesList = document.querySelector('.places__list');

const popupEditProfile = document.querySelector('.popup_type_edit');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_description');

buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profile.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

buttonAddCard.addEventListener('click', () => openModal(popupAddCard));

const popupImage = document.querySelector('.popup_type_image');
const imageMesto = popupImage.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__caption');

const openCardsModal = function (name, link) {
  imageMesto.src = link;
  imageMesto.alt = name;
  caption.textContent = name;

  openModal(popupImage);
}

// @todo: Вывести карточки на страницу

initialCards.forEach((elem) => {
  placesList.append(createCard(placesItem, elem.name, elem.link, removeCard, likeCard, openCardsModal));
});

const overlay = document.querySelectorAll('.popup');

overlay.forEach((elem) => {
  elem.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close'))
      closeModal(elem);
  });
});

const popupAddCard = document.querySelector('.popup_type_new-card');

const cardNameInput = popupAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = popupAddCard.querySelector('.popup__input_type_url');

const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profile.textContent = name;
  profileDescription.textContent = job;

  closeModal(popupEditProfile);
}

const handleCardFormSubmit = function (evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  placesList.prepend(createCard(placesItem, cardName, cardLink, removeCard, likeCard, openCardsModal));

  evt.target.reset();
  closeModal(popupAddCard);
}

popupEditProfile.addEventListener('submit', handleProfileFormSubmit);
popupAddCard.addEventListener('submit', handleCardFormSubmit)