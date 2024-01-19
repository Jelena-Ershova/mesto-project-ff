// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

const placesItem = cardTemplate.querySelector('.places__item');

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

const createCard = function(cardName, cardLink, removeCard) {

  let placeItem = placesItem.cloneNode(true);

  placeItem.querySelector('.card__image').src = cardLink;
  placeItem.querySelector('.card__image').alt = `Фотография места в России - ${cardName}`;
  placeItem.querySelector('.card__title').textContent = cardName;
  placeItem.querySelector('.card__delete-button').addEventListener('click', removeCard, true);

  return placeItem;
}

// @todo: Функция удаления карточки

const removeCard = function(event) {
  event.target.closest('.card').remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach((elem) => {
  placesList.append(createCard(elem.name, elem.link, removeCard));
});