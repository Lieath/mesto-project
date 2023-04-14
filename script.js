const page = document.querySelector('.page');

// Шаблон карточки

const photoCardTemplate = page.querySelector('#photo-card-template').content;

// Общий попап

const popup = page.querySelector('.popup');

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

// Функция закрытия попапа

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// Слушатели кнопок [X]

popupAddCloseButton.addEventListener('click', () => closePopup(popupAdd));
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupPhotoCloseButton.addEventListener('click', () => closePopup(popupPhotoView));

// Функция закрытия попапа по нажатию на overlay

function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(popupAdd);
        closePopup(popupProfile);
        closePopup(popupPhotoView);
    };
    
}

document.addEventListener('click', closePopupOverlay);

// Функция закрытия попапа через клавишу 'Esc'

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(popupAdd);
        closePopup(popupProfile);
        closePopup(popupPhotoView);
      }
};

document.addEventListener('keydown', closePopupEsc);

// Функция показа карточки

function showImage(imageLink, name) {
    openPopup(popupPhotoView);
    popupPhotoImage.src = imageLink;
    popupPhotoImage.alt = name;
    popupPhotoTitle.textContent = name;
  };

// Слушатель кнопки [+]

addButton.addEventListener('click', () => {

    popupInputTitle.value = '';
    popupInputLink.value = '';
    
    openPopup(popupAdd);
    
    });

// SUBMIT кнопки "Создать"

function submitCardForm(evt) {
    
    evt.preventDefault();

    renderCard(popupInputTitle.value, popupInputLink.value);
    
    closePopup(popupAdd);

    popupInputTitle.value = '';
    popupInputLink.value = '';

}

popupAddForm.addEventListener('submit', submitCardForm);

// Слушатель кнопки EDIT

editButton.addEventListener('click', () => {

    openPopup(popupProfile);

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

// Функция добавления новой карточки

function addNewCard (cardTitle, cardLink) {

    const photoCard = photoCardTemplate.cloneNode(true);

    photoCard.querySelector('.photo-card__title').textContent = cardTitle;
    photoCard.querySelector('.photo-card__image').src = cardLink;
    photoCard.querySelector('.photo-card__image').alt = cardTitle;

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

    photoCard.querySelector('.photo-card__image').addEventListener('click', (evt) => {
        showImage(evt.target.src, cardTitle);
    });

    return(photoCard);

}

// Добавление карточки в грид

function renderCard(cardTitle, cardLink) {

    photoGrid.prepend(addNewCard(cardTitle, cardLink));

}

// Начальные карточки

const initialCards = [
    {
      name: 'Чукотка',
      link: './images/chukotka.webp',
    },
    {
      name: 'Ингушетия',
      link: './images/ingushetiya.webp',
    },
    {
      name: 'Алтай',
      link: './images/altai.webp',
    },
    {
      name: 'Якутия',
      link: './images/yakutiya.webp',
    },
    {
      name: 'Дагестан',
      link: './images/dagestan.webp',
    },
    {
      name: 'Кавказ',
      link: './images/kavkaz.webp',
    }
];

// Добавление начальных карточек на страницу

function setupInitialCards () {

    for (i = 0; i < initialCards.length; i++) {

        renderCard(initialCards[i].name, initialCards[i].link);

    };

}

setupInitialCards();