document.addEventListener('DOMContentLoaded', function () {
    const popUp = document.querySelector('.pop-up-overlay');
    const popUpCloseIcon = document.querySelector('.toggle-btn');
    const contact = document.querySelectorAll('.contact');

    function closePopUp () {
	    popUp.style.left = '-100%';
        popUp.style.opacity = '0';
    }
    function openPopUp() {
        popUp.style.left = '0';
        popUp.style.opacity = '1';
    }

    popUpCloseIcon.addEventListener('click', closePopUp);

    contact.forEach(element => {
        element.addEventListener('click', openPopUp);
    });
});