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

// @todo: Функция создания карточки

const createCard = function (placesItem, cardName, cardLink, removeCard, likeCard, openModal) {

  let placeItem = placesItem.cloneNode(true);

  placeItem.querySelector('.card__image').src = cardLink;
  placeItem.querySelector('.card__image').alt = `Фотография места в России - ${cardName}`;
  placeItem.querySelector('.card__title').textContent = cardName;

  placeItem.querySelector('.card__delete-button').addEventListener('click', removeCard);

  placeItem.querySelector('.card__like-button').addEventListener('click', likeCard);

  placeItem.querySelector('.card__image').addEventListener('click', openModal);

  return placeItem;
}

// @todo: Функция удаления карточки

const removeCard = function (event) {
  event.target.closest('.card').remove();
};

const likeCard = function (event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export { initialCards, createCard, removeCard, likeCard };