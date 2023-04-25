const page = document.querySelector('.page');

// Шаблон карточки

const photoCardTemplate = page.querySelector('#photo-card-template').content;

// Общий попап

const popup = page.querySelector('.popup');

// Попап добавления карточки

const popupAdd = page.querySelector('.popup.popup_add');
const popupCardTitle = popupAdd.querySelector('.popup__title');
const popupAddForm = document.forms.addForm;
const popupInputTitle = popupAddForm.title;
const popupInputLink = popupAddForm.link;
const popupAddSubmitButton = popupAdd.querySelector('.popup__submit-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button');

// Попап профиля

const popupProfile = page.querySelector('.popup.popup_profile');
const popupProfileTitle = popupProfile.querySelector('.popup__title');
const popupProfileForm = document.forms.editForm;
const popupInputName = popupProfileForm.name;
const popupInputBio = popupProfileForm.bio;
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

// Показать ошибку

function showInputError(formElement, inputElement, errorMessage) {
    
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
}

// Скрыть ошибку

function hideInputError(formElement, inputElement) {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
}

// Функция показа карточки

function showImage(imageLink, name) {
    openPopup(popupPhotoView);
    popupPhotoImage.src = imageLink;
    popupPhotoImage.alt = name;
    popupPhotoTitle.textContent = name;
  };

// Слушатель кнопки [+]

addButton.addEventListener('click', () => {

    popupAddForm.reset();

    setSubmitButtonState(popupAddForm, popupAddSubmitButton);

    const inputElements = Array.from(popupAddForm);

    inputElements.forEach(function (inputElement) {
        inputElement.classList.remove('popup__input_error-line');
    });

    /* inputElements.forEach(function (inputElement) {
        hideInputError(popupAddForm, inputElement)
    }); */
    
    openPopup(popupAdd);
    
    });

// Функция проверки валидности инпута

function isValid(formElement, inputElement) {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
        inputElement.classList.add('popup__input_error-line');
      } else {
        hideInputError(formElement, inputElement);
        inputElement.classList.remove('popup__input_error-line');
      }

      return inputElement.validity.valid;
}

// Функция изменения состояния кнопки отправки формы

function setSubmitButtonState(formElement, buttonElement) {

    const inputsValidity = Array.from(formElement).some(function (inputElement) {
        return !inputElement.validity.valid;
    });

    if (inputsValidity === false) {
        buttonElement.classList.remove('popup__submit-button_not-active');
        buttonElement.removeAttribute('disabled');
    } else {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add('popup__submit-button_not-active');
    }
}

// Слушатель инпутов окна добавления карточки

popupAddForm.addEventListener('input', function(evt) {

    isValid(popupAddForm, evt.target);
    setSubmitButtonState(popupAddForm, popupAddSubmitButton);
});

// Слушатель инпутов окна редактирования профиля

popupProfileForm.addEventListener('input', function(evt) {

    isValid(popupProfileForm, evt.target);
    setSubmitButtonState(popupProfileForm, popupProfileSubmitButton);
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

    popupInputName.value = profileInfoUsername.textContent;
    popupInputBio.value = profileInfoBio.textContent;

    openPopup(popupProfile);

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