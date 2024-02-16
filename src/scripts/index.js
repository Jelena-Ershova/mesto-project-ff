import '../pages/index.css';

import {initialCards, createCard, removeCard, likeCard, placesList, placesItem } from "./cards.js"

import { openModal, closeModal, popupEditProfile, popupAddCard, nameInput, jobInput, cardNameInput, cardLinkInput } from "./modal.js";

// @todo: DOM узлы

const buttonEditProfile = document.querySelector('.profile__edit-button');

const buttonAddCard = document.querySelector('.profile__add-button');


buttonEditProfile.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(popupEditProfile);
});

buttonAddCard.addEventListener('click', () => openModal(popupAddCard));

// @todo: Вывести карточки на страницу

initialCards.forEach((elem) => {
  placesList.append(createCard(placesItem, elem.name, elem.link, removeCard, likeCard, openModal));
});

const buttonsClose = document.querySelectorAll('.popup__close');

buttonsClose.forEach((closed) => {
  closed.addEventListener('click', closeModal);
});

const overlay = document.querySelectorAll('.popup');

overlay.forEach((elem) => {
  elem.addEventListener('click', closeModal);
});

const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  document.querySelector('.profile__title').textContent = name;
  document.querySelector('.profile__description').textContent = job;

  closeModal(popupEditProfile);
}

const handleCardFormSubmit = function (evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  placesList.prepend(createCard(placesItem, cardName, cardLink, removeCard, likeCard, openModal));

  evt.target.reset();
  closeModal(popupAddCard);
}

popupEditProfile.addEventListener('submit', handleProfileFormSubmit);
popupAddCard.addEventListener('submit', handleCardFormSubmit)