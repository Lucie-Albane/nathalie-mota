document.addEventListener('DOMContentLoaded', function () {
    const popUp = document.querySelector('.pop-up-overlay');
    const popUpCloseIcon = document.querySelector('.toggle-btn');
    const contact = document.querySelector('.contact');

    function closePopUp () {
	    popUp.style.display = 'none';
    }
    function openPopUp() {
        popUp.style.display = 'block';
    }
    popUpCloseIcon.addEventListener('click', closePopUp);
    contact.addEventListener('click', openPopUp);
});