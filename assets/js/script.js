document.addEventListener('DOMContentLoaded', function () {
    const popUp = document.querySelector('.pop-up-overlay');
    const contact = document.querySelector('.contact');
    const contactPhoto = document.querySelector('.single-contact-btn');
    const referenceInput = document.querySelector('.ref-photo');
    const popUpContent = document.querySelector('.pop-up');

    function closePopUp () {
        popUp.style.left = '-100%';
        popUp.style.opacity = '0';
        referenceInput.value = '';
    }

    function openPopUp() {
        popUp.style.left = '0';
        popUp.style.opacity = '1';
    }

    function openPopUpPhoto(reference) {
        popUp.style.left = '0';
        popUp.style.opacity = '1';
        referenceInput.value = reference;
    }

    contact.addEventListener('click', openPopUp);

    popUp.addEventListener('click', function(event) {
        if (event.target === popUp) {
            closePopUp();
        }
    });

    popUpContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    contactPhoto.addEventListener('click', function () {
        const reference = contactPhoto.getAttribute('data-reference');
        openPopUpPhoto(reference);
    });
});