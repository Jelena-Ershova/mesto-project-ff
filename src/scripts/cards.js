import {popupImage} from "./modal.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

const placesList = document.querySelector('.places__list');

// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

const placesItem = cardTemplate.querySelector('.places__item');

// @todo: Функция создания карточки

const createCard = function (placesItem, cardName, cardLink, removeCard, likeCard, openModal) {

  const placeItem = placesItem.cloneNode(true);
  const cardImage = placeItem.querySelector('.card__image');

  const altForImage = `Фотография места в России - ${cardName}`;
  cardImage.src = cardLink;
  cardImage.alt = altForImage;
  placeItem.querySelector('.card__title').textContent = cardName;

  placeItem.querySelector('.card__delete-button').addEventListener('click', removeCard);

  placeItem.querySelector('.card__like-button').addEventListener('click', likeCard);

  cardImage.addEventListener('click', () => {
    const image = popupImage.querySelector('.popup__image');
    image.src = cardLink;
    image.alt = altForImage;
    openModal(popupImage);
  });

  return placeItem;
}

// @todo: Функция удаления карточки

const removeCard = function (event) {
  event.target.closest('.card').remove();
};

const likeCard = function (event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export { initialCards, createCard, removeCard, likeCard, placesList, placesItem };