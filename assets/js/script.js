document.addEventListener('DOMContentLoaded', function () {
    // ***** GESTION CONTACT POP UP : *****
    // ouverture
    function openPopUp() {
        popUp.style.left = '0';
        popUp.style.opacity = '1';
    }
    // ouverture avec référence
    const referenceInput = document.querySelector('.ref-photo');
    function openPopUpPhoto(reference) {
        popUp.style.left = '0';
        popUp.style.opacity = '1';
        referenceInput.value = reference;
    }
    const contactButtons = document.querySelectorAll('.contact');
    contactButtons.forEach(button => {
        button.addEventListener('click', openPopUp);
    });
    const contactPhoto = document.querySelector('.single-contact-btn');
    if(contactPhoto) {
        contactPhoto.addEventListener('click', function () {
            const reference = contactPhoto.getAttribute('data-reference');
            openPopUpPhoto(reference);
        });
    }

    //fermeture
    const popUp = document.querySelector('.pop-up-overlay');
    const popUpContent = document.querySelector('.pop-up');
    function closePopUp () {
        popUp.style.left = '-100%';
        popUp.style.opacity = '0';
        referenceInput.value = '';
    }
    popUp.addEventListener('click', function(event) {
        if (event.target === popUp) {
            closePopUp();
        }
    });
    const toggleButton = document.querySelector('.toggle-btn');
    toggleButton.addEventListener('click', closePopUp);
    popUpContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // ***** GESTION BURGER MENU : *****
    // ouverture
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.primary-menu-mobile');
    function openBurgerMenu() {
        mobileMenu.classList.toggle('active');
        burgerMenu.classList.toggle('open');
    };
    burgerMenu.addEventListener('click', openBurgerMenu);


    // ***** GESTION DES IMAGES SUR LA PAGE D ACCUEIL : *****
    // Charger plu d'images :
    let offset = 8; 
    let morePosts = true;
    const morePostsButtons = document.querySelectorAll('.load-btn');
    const load = document.querySelector('.load');
    function loadMore() {
        if(morePosts) {
            fetch(ajaxurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache'
                },
                body: 'action=load_more_photos&offset=' + offset
            })
            .then(response => response.text())
            .then(data => {
                if (data.trim() === '') {
                    morePosts = false;
                    morePostsButtons.forEach(button => {
                        button.style.display = 'none';
                    });
                    load.innerHTML += '<p> Il n\'y a plus de photo à afficher</p>';
                } else {
                    const photosList = document.querySelector('.photos-list');
                    photosList.innerHTML += data;
                    offset += 8;
                }
            });
        }
    }

    morePostsButtons.forEach(button => {
        button.addEventListener('click', loadMore);
    });

    // Gestion des filtres :
    const filterCategories = document.getElementById('filter-categories');
    const filterFormats = document.getElementById('filter-formats');
    
    filterCategories.addEventListener('change', updatePhotos);
    filterFormats.addEventListener('change', updatePhotos);
    
    function updatePhotos() {
        const selectedCategorie = filterCategories.value;
        const selectedFormat = filterFormats.value;
        let url;
        if (selectedCategorie === '' && selectedFormat !== '') {
            url = `${ajaxurl}?action=get_posts_by_term&format_terms=${selectedFormat}`;
        } else if (selectedCategorie === '' && selectedFormat === '') {
            url = `${ajaxurl}?action=get_all_posts`;
        } else {
            url = `${ajaxurl}?action=get_posts_by_term&categorie_terms=${selectedCategorie}&format_terms=${selectedFormat}`;
        }
    
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const photosList = document.querySelector('.photos-list');
                photosList.innerHTML = data;
                offset = data.trim().length;
                morePosts = false;
                morePostsButtons.forEach(button => {
                    button.style.display = 'none';
                });
                load.innerHTML = '';
        });
    }
});