document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.toggle-btn');
    const popUp = document.querySelector('.pop-up-overlay');
    const contactButtons = document.querySelectorAll('.contact');
    const contactPhoto = document.querySelector('.single-contact-btn');
    const referenceInput = document.querySelector('.ref-photo');
    const popUpContent = document.querySelector('.pop-up');
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.primary-menu-mobile');

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

    contactButtons.forEach(button => {
        button.addEventListener('click', openPopUp);
    });

    popUp.addEventListener('click', function(event) {
        if (event.target === popUp) {
            closePopUp();
        }
    });
    toggleButton.addEventListener('click', closePopUp);

    popUpContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    function openBurgerMenu() {
        mobileMenu.classList.toggle('active');
    };
    burgerMenu.addEventListener('click', openBurgerMenu);

    if(contactPhoto) {
        contactPhoto.addEventListener('click', function () {
            const reference = contactPhoto.getAttribute('data-reference');
            openPopUpPhoto(reference);
        });
    }

});