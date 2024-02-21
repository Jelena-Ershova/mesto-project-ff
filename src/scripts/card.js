// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

const placesItem = cardTemplate.querySelector('.places__item');

// @todo: Функция создания карточки

const createCard = function (placesItem, cardName, cardLink, removeCard, likeCard, openCardsModal) {

  const placeItem = placesItem.cloneNode(true);
  const cardImage = placeItem.querySelector('.card__image');

  const altForImage = `Фотография места в России - ${cardName}`;
  cardImage.src = cardLink;
  cardImage.alt = altForImage;
  placeItem.querySelector('.card__title').textContent = cardName;

  placeItem.querySelector('.card__delete-button').addEventListener('click', removeCard);

  placeItem.querySelector('.card__like-button').addEventListener('click', likeCard);

  cardImage.addEventListener('click', () => openCardsModal(cardName, cardLink));

  return placeItem;
}

// @todo: Функция удаления карточки

const removeCard = function (event) {
  event.target.closest('.card').remove();
};

const likeCard = function (event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export { createCard, removeCard, likeCard, placesItem };