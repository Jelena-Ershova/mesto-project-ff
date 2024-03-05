// _id: "efefbf09ab82baf6a396019e" мой _id

import '../pages/index.css';

import { createCard, removeCard, placesItem } from "./card.js"

import { openModal, closeModal, waitLoading } from "./modal.js";

import { enableValidation, clearValidation } from './validation.js';

import { getInitial, setProfile, addNewCard, getLikesCard, updateAvatar, deleteCard } from './api.js'

// @todo: DOM узлы

const imgProfile = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const buttonAvatar = document.querySelector('.profile__image-button-update');

const buttonEditProfile = document.querySelector('.profile__edit-button');

const buttonAddCard = document.querySelector('.profile__add-button');

const popupAvatar = document.querySelector('.popup_avatar');
const avatarInput = popupAvatar.querySelector('.popup__input_type_url-avatar');

const placesList = document.querySelector('.places__list');

const popupEditProfile = document.querySelector('.popup_type_edit');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_description');

const popupAddCard = document.querySelector('.popup_type_new-card');

const cardNameInput = popupAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = popupAddCard.querySelector('.popup__input_type_url');

const popupImage = document.querySelector('.popup_type_image');
const imageMesto = popupImage.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__caption');

const popupConfirmation = document.querySelector('.popup_confirmation');
const buttonPopupConfirmation = popupConfirmation.querySelector('.popup__button');

const overlay = document.querySelectorAll('.popup');

// Список классов для валидации

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Список папок для запросов

const apiPathConfig = {
  profile: '/users/me',
  cards: '/cards',
  likes: '/cards/likes',
  avatar: '/users/me/avatar'
}

// Id профиля

let myId = "";


// Запрашиваем данные профиля и карточки

Promise.all([getInitial(apiPathConfig.profile), getInitial(apiPathConfig.cards)])
  .then(([responseProfile, responseCards]) => {
    getProfile(responseProfile);

    myId = responseProfile._id;
    getCards(responseCards);
  })
  .catch(error => {
    console.error(error)
  })

// получить данные профиля

const getProfile = (profile) => {
  imgProfile.style.backgroundImage = `url("${profile.avatar}")`;
  profileName.textContent = profile.name;
  profileDescription.textContent = profile.about;
}

// @todo: Вывести карточки на страницу

const getCards = (cards) => {
  cards.forEach((elem) => {
    placesList.append(createCard(placesItem, elem, openConfirmation, likeCard, openCardsModal, myId));
  })
}

const openConfirmation = (cardID, cardLayout) => {
  openModal(popupConfirmation);
  buttonPopupConfirmation.addEventListener('click', () => {
    deleteCard(apiPathConfig.cards, cardID)
      .then(res => {
        console.info(res.message);
        closeModal(popupConfirmation);
        removeCard(cardLayout);
      })
      .catch(error => {
        console.error(error);
      })
  })
}

//Слушатель кнопки изменения аватара

buttonAvatar.addEventListener('click', () => {
  avatarInput.value = "";
  clearValidation(popupAvatar, validationConfig);
  openModal(popupAvatar);
})

// Слушатель кнопки редактирования профиля

buttonEditProfile.addEventListener('click', () => {
  openModal(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEditProfile, validationConfig);
});

// Слушатель кнопки Добавления карточки

buttonAddCard.addEventListener('click', () => {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  clearValidation(popupAddCard, validationConfig);
  openModal(popupAddCard);
});

// Просмотр картинки в модальном окне

const openCardsModal = (name, link) => {
  imageMesto.src = link;
  imageMesto.alt = name;
  caption.textContent = name;
  openModal(popupImage);
}

// Слушатель на оверлей и кнопку закрытия модального окна

overlay.forEach((elem) => {
  elem.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close'))
      closeModal(elem);
  });
});

// Submit update avatar

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  waitLoading(true, popupAvatar);
  const avatarLink = avatarInput.value;
  updateAvatar(apiPathConfig.avatar, avatarLink)
    .then(res => {
      imgProfile.style.backgroundImage = `url("${res.avatar}")`;
      closeModal(popupAvatar);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => waitLoading(false, popupAvatar));
}

// Submit новые данные профиля

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  waitLoading(true, popupEditProfile);
  const name = nameInput.value;
  const job = jobInput.value;

  setProfile(apiPathConfig.profile, name, job)
    .then(res => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;

      closeModal(popupEditProfile);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => waitLoading(false, popupEditProfile));
}

// Submit добавить новую карточку

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  waitLoading(true, popupAddCard);
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  addNewCard(apiPathConfig.cards, cardName, cardLink)
    .then(res => {
      placesList.prepend(createCard(placesItem, res, openConfirmation, likeCard, openCardsModal, myId));

      evt.target.reset();
      closeModal(popupAddCard);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => waitLoading(false, popupAddCard));
}

popupAvatar.addEventListener('submit', handleAvatarFormSubmit);
popupEditProfile.addEventListener('submit', handleProfileFormSubmit);
popupAddCard.addEventListener('submit', handleCardFormSubmit);

// Валидация

enableValidation(validationConfig);


// Добавляем/Удаляем LIKE

const likeCard = (place, _id) => {
  const buttonLikeCard = place.querySelector('.card__like-button');
  const amountLikes = place.querySelector('.card__like-amount');

  if (buttonLikeCard.classList.contains('card__like-button_is-active')) {

    getLikesCard(apiPathConfig.likes, 'DELETE', _id)
      .then(res => {
        buttonLikeCard.classList.remove('card__like-button_is-active');
        amountLikes.textContent = res.likes.length;
      })
      .catch(error => {
        console.error(error);
      });
  }
  else {

    getLikesCard(apiPathConfig.likes, 'PUT', _id)
      .then(res => {
        buttonLikeCard.classList.add('card__like-button_is-active');
        amountLikes.textContent = res.likes.length;
      })
      .catch(error => {
        console.error(error);
      });
  }
}