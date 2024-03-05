// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

const placesItem = cardTemplate.querySelector('.places__item');

const hasMyLike = (likes, myId) => {
  let likeMe = false;
  likes.forEach((like) => {
    if (like._id === myId) {
      likeMe = true;
    }
  });
  return likeMe;
}

// @todo: Функция создания карточки

const createCard = (placesItem, data, openConfirmation, likeCard, openCardsModal, myId) => {

  const placeItem = placesItem.cloneNode(true);
  const cardImage = placeItem.querySelector('.card__image');
  const buttonDelete = placeItem.querySelector('.card__delete-button');
  const buttonLike = placeItem.querySelector('.card__like-button');

  const altForImage = `Фотография места в России - ${data.name}`;
  cardImage.src = data.link;
  cardImage.alt = altForImage;
  placeItem.querySelector('.card__title').textContent = data.name;
  placeItem.querySelector('.card__like-amount').textContent = data.likes.length;

  if (data.owner._id === myId) {
    buttonDelete.classList.add('card__delete-button-active');
    buttonDelete.addEventListener('click', () => openConfirmation(data._id, placeItem));
  }

  const myLike = hasMyLike(data.likes, myId);
  if (myLike) {
    buttonLike.classList.add('card__like-button_is-active');
  }

  buttonLike.addEventListener('click', () => likeCard(placeItem, data._id));

  cardImage.addEventListener('click', () => openCardsModal(data.name, data.link));

  return placeItem;
}

// @todo: Функция удаления карточки

const removeCard = (card) => {
  card.remove();
};

export { createCard, removeCard, placesItem };