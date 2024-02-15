import '../pages/index.css';
import { initialCards, createCard, removeCard, likeCard } from "./cards.js";

import { openModal } from "./modal.js";

// @todo: DOM узлы

export const placesList = document.querySelector('.places__list');

const buttonEditProfile = document.querySelector('.profile__edit-button');

const buttonAddCard = document.querySelector('.profile__add-button');

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

export const placesItem = cardTemplate.querySelector('.places__item');

// @todo: Вывести карточки на страницу

initialCards.forEach((elem) => {
  placesList.append(createCard(placesItem, elem.name, elem.link, removeCard, likeCard, openModal));
});

buttonEditProfile.addEventListener('click', openModal);

buttonAddCard.addEventListener('click', openModal);