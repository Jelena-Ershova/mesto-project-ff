import '../pages/index.css';

import {initialCards, createCard, removeCard, likeCard, placesItem } from "./cards.js"

import { openModal, closeModal, popupEditProfile, popupAddCard, nameInput, jobInput, cardNameInput, cardLinkInput } from "./modal.js";

// @todo: DOM узлы

const profile = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const buttonEditProfile = document.querySelector('.profile__edit-button');

const buttonAddCard = document.querySelector('.profile__add-button');

const placesList = document.querySelector('.places__list');


buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profile.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

buttonAddCard.addEventListener('click', () => openModal(popupAddCard));

const popupImage = document.querySelector('.popup_type_image');

const openCardsModal = function (evt) {
  const picture = evt.target;
  const image = popupImage.querySelector('.popup__image');
  const description = popupImage.querySelector('.popup__caption');
  image.src = picture.src;
  image.alt = picture.alt;
  const index = image.alt.lastIndexOf('-');
  description.textContent = picture.alt.slice(index+2);

  openModal(popupImage);
}

// @todo: Вывести карточки на страницу

initialCards.forEach((elem) => {
  placesList.append(createCard(placesItem, elem.name, elem.link, removeCard, likeCard, openCardsModal));
});

const overlay = document.querySelectorAll('.popup');

overlay.forEach((elem) => {
  let popupClose;
  switch (elem) {
    case popupEditProfile:
      popupClose = popupEditProfile;
      console.log(popupClose);
      break;
    case popupAddCard:
      popupClose = popupAddCard;
      console.log(popupClose);
      break;
    case popupImage:
      popupClose = popupImage;
      console.log(popupClose);
      break;
  }
  elem.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) 
      closeModal(popupClose);
  });
});

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