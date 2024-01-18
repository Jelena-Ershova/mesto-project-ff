// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

const placesItem = cardTemplate.querySelector('.places__item');

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция удаления карточки

let removeCard = function (event) {
  let cardDelete = placesList.querySelector(`#${event.target.id}`);
  cardDelete.parentElement.remove();
};

// @todo: Функция создания карточки

const createCard = function(cardName, cardLink, num) {

  let placeItem = placesItem.cloneNode(true);

  placeItem.querySelector('.card__image').src = cardLink;
  placeItem.querySelector('.card__image').alt = `Фотография места в России - ${cardName}`;
  placeItem.querySelector('.card__title').textContent = cardName;
  
  let buttonRemove = placeItem.querySelector('.card__delete-button');

  buttonRemove.id = `card_${num + 1}`;
  buttonRemove.addEventListener('click', removeCard);

  return placeItem;
}

// @todo: Вывести карточки на страницу

initialCards.forEach((elem, num) => {
  placesList.append(createCard(elem.name, elem.link, num));
});
