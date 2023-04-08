const page = document.querySelector('.page');

// Попап добавления карточки

const popupAdd = page.querySelector('.popup.popup_add');
const popupCardTitle = popupAdd.querySelector('.popup__title');
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupInputTitle = popupAddForm.querySelector('.popup__input[name="title"]');
const popupInputLink = popupAddForm.querySelector('.popup__input[name="link"]');
const popupAddSubmitButton = popupAddForm.querySelector('.popup__submit-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');

// Попап профиля

const popupProfile = page.querySelector('.popup.popup_profile');
const popupProfileTitle = popupProfile.querySelector('.popup__title');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupInputName = popupProfileForm.querySelector('.popup__input[name="name"]');
const popupInputBio = popupProfileForm.querySelector('.popup__input[name="bio"]');
const popupProfileSubmitButton = popupProfileForm.querySelector('.popup__submit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');

// Попап фотографии

const popupPhotoView = page.querySelector('.photo-view');
const popupPhotoTitle = popupPhotoView.querySelector('.photo-view__title');
const popupPhotoImage = popupPhotoView.querySelector('.photo-view__image');
const popupPhotoCloseButton = popupPhotoView.querySelector('.photo-view__close-button');

// Информация профиля

const profileInfoUsername = page.querySelector('.profile-info__username');
const profileInfoBio = page.querySelector('.profile-info__bio');

// Кнопки

const addButton = page.querySelector('.profile__add-button');
const editButton = page.querySelector('.profile__edit-button');

// Грид карточек

const photoGrid = page.querySelector('.photo-grid');

// Функция открытия попапа

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function openPhoto(popup) {
    popup.classList.add('photo-view_opened');
}

// Функция закрытия попапа

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function closePhoto(popup) {
    popup.classList.remove('photo-view_opened');
}

// Функция показа карточки

function showImage(imageLink, name) {
    openPhoto(popupPhotoView);
    popupPhotoImage.src = imageLink;
    popupPhotoTitle.textContent = name;
  };

// Слушатель кнопки [+]

addButton.addEventListener('click', () => {

    openPopup(popupAdd);
    
    popupCardTitle.textContent = 'Новое место';
    popupInputTitle.placeholder = 'Название';
    popupInputLink.placeholder = 'Ссылка на картинку';
    popupAddSubmitButton.textContent = 'Создать';
    
    });

// SUBMIT кнопки "Создать"

function submitCardForm(evt) {
    
    evt.preventDefault();

    addNewCard(popupInputTitle.value, popupInputLink.value);
    
    closePopup(popupAdd);

    popupInputTitle.value = '';
    popupInputLink.value = '';

}

popupAddForm.addEventListener('submit', submitCardForm);

// Слушатель кнопки EDIT

editButton.addEventListener('click', () => {

    openPopup(popupProfile);

    popupProfileTitle.textContent = 'Редактировать профиль';
    popupInputName.placeholder = 'Имя';
    popupInputBio.placeholder = 'О себе';
    popupProfileSubmitButton.textContent = 'Сохранить';

    popupInputName.value = profileInfoUsername.textContent;
    popupInputBio.value = profileInfoBio.textContent;

});

// SUBMIT кнопки "Сохранить"

function submitProfileForm(evt) {

    evt.preventDefault();
    
    profileInfoUsername.textContent = popupInputName.value;
    profileInfoBio.textContent = popupInputBio.value;

    closePopup(popupProfile);

}

popupProfileForm.addEventListener('submit', submitProfileForm);

// Слушатели кнопок [X]

popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupPhotoCloseButton.addEventListener('click', () => closePhoto(popupPhotoView));

// Функция добавления новой карточки

function addNewCard (cardTitle, cardLink, cardAlt = 'Описание') {

    const photoCardTemplate = page.querySelector('#photo-card-template').content;
    const photoCard = photoCardTemplate.cloneNode(true);

    photoCard.querySelector('.photo-card__title').textContent = cardTitle;
    photoCard.querySelector('.photo-card__image').src = cardLink;
    photoCard.querySelector('.photo-card__image').alt = cardAlt;

    // Кнопка LIKE

    const likeButton = photoCard.querySelector('.photo-card__like-button');
    likeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('photo-card__like-button_active');
    });

    // Кнопка DELETE

    const deleteButton = photoCard.querySelector('.photo-card__delete-button');
    deleteButton.addEventListener('click', (evt) => {
        evt.target.closest('.photo-card').remove();
    });

    // Попап с фото

    photoCard.querySelector('.photo-card__image').addEventListener('click', function(evt) {
        showImage(evt.target.src, cardTitle);
    });

    photoGrid.prepend(photoCard);

    return(photoCard);

}

// Начальные карточки

const initialCards = [
    {
      name: 'Чукотка',
      link: './images/chukotka.webp',
      alt: 'Бухта Провидения Чукотки.'
    },
    {
      name: 'Ингушетия',
      link: './images/ingushetiya.webp',
      alt: 'Джейрахский район Ингушетии.'
    },
    {
      name: 'Алтай',
      link: './images/altai.webp',
      alt: 'Телецкое озеро Алтая.'
    },
    {
      name: 'Якутия',
      link: './images/yakutiya.webp',
      alt: 'Горы Якутии.'
    },
    {
      name: 'Дагестан',
      link: './images/dagestan.webp',
      alt: 'Сулакский каньон Дагестана.'
    },
    {
      name: 'Кавказ',
      link: './images/kavkaz.webp',
      alt: 'Кавказские горы.'
    }
];

// Добавление начальных карточек на страницу

function setupInitialCards () {

    for (i = 0; i <= initialCards.length; i++) {

        addNewCard(initialCards[i].name, initialCards[i].link, initialCards[i].alt);

    };

}

setupInitialCards();