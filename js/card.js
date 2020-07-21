'use strict';

// Модуль, который отвечает за создание карточки объявлений

window.card = (function () {
  // Функция удаления карточки объявления

  var removeCard = function () {
    var oldCard = document.querySelector('.map__card');
    if (oldCard) {
      oldCard.remove();
    }
  };

  // Функция удаления карточки объявления по нажатию на Escape

  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      evt.preventDefault();
      removeCard();
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  // Функция отрисовки одной карточки объявления

  var renderSingleCard = function (ad, templateContent) {
    var cardElement = templateContent.cloneNode(true);
    var cardElementTitle = cardElement.querySelector('.popup__title');
    var cardElementAddress = cardElement.querySelector('.popup__text--address');
    var cardElementPrice = cardElement.querySelector('.popup__text--price');
    var cardElementType = cardElement.querySelector('.popup__type');
    var cardElementRoomsGuests = cardElement.querySelector('.popup__text--capacity');
    var cardElementCheckinCheckout = cardElement.querySelector('.popup__text--time');
    var cardElementFeatures = cardElement.querySelector('.popup__features');
    var cardElementDescription = cardElement.querySelector('.popup__description');
    var cardElementPhotos = cardElement.querySelector('.popup__photos');
    var cardElementAvatar = cardElement.querySelector('.popup__avatar');
    var cardElementClose = cardElement.querySelector('.popup__close');

    cardElementTitle.textContent = ad.offer.title;
    cardElementAddress.textContent = ad.offer.address;
    cardElementPrice.textContent = ad.offer.price + '₽/ночь';
    cardElementType.textContent = ad.offer.type;
    switch (ad.offer.type) {
      case 'flat':
        cardElementType.textContent = 'Квартира';
        break;
      case 'bungalo':
        cardElementType.textContent = 'Бунгало';
        break;
      case 'house':
        cardElementType.textContent = 'Дом';
        break;
      case 'palace':
        cardElementType.textContent = 'Дворец';
        break;
    }
    cardElementRoomsGuests.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElementCheckinCheckout.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardElementFeatures.textContent = ad.offer.features.toString();
    cardElementDescription.textContent = ad.offer.description;
    var cardElementPhotosImage = cardElementPhotos.querySelector('img');
    if (ad.offer.photos.length === 0) {
      cardElementPhotosImage.remove();
    } else if (ad.offer.photos.length === 1) {
      cardElementPhotosImage.setAttribute('src', ad.offer.photos.toString());
    } else if (ad.offer.photos.length > 1) {
      cardElementPhotosImage.setAttribute('src', ad.offer.photos[0].toString());
      var cardElementPhotosImageCloned = cardElementPhotosImage.cloneNode();
      for (var i = 1; i < ad.offer.photos.length; i++) {
        cardElementPhotosImageCloned.setAttribute('src', ad.offer.photos[i].toString());
        cardElementPhotos.appendChild(cardElementPhotosImageCloned);
      }
    }
    cardElementAvatar.setAttribute('src', ad.author.avatar);

    cardElementClose.addEventListener('click', function () {
      removeCard();
    });

    document.addEventListener('keydown', onCardEscPress);

    return cardElement;
  };

  // Функция отрисовки всех карточек объявлений

  var renderCards = function (adsArray, arrayIndex, templateId) {
    var fragment = document.createDocumentFragment();
    var cardTemplateContent = document.querySelector(templateId).content;

    fragment.appendChild(renderSingleCard(adsArray[arrayIndex], cardTemplateContent));

    var beforeElement = document.querySelector('.map__filters-container');
    document.querySelector('.map').insertBefore(fragment, beforeElement);
  };

  return {
    removeCard: removeCard,
    renderCards: renderCards
  };
})();
