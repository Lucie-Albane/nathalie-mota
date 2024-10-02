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

    // fermeture
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
        event.stopPropagation(); // pour éviter que le click sur le formulaire ne ferme la modale
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
    let offset = 8;  // nombres de posts déjà chargés sur la page
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
            // réponse de la promesse retournée par la requête AJAX
            .then(response => response.text())
            .then(data => {
                if (data.trim() === '') { // si réponse vide (il n'y a plus de posts à afficher)
                    morePosts = false;
                    morePostsButtons.forEach(button => {
                        button.style.display = 'none';
                    });
                    load.innerHTML += '<p> Il n\'y a plus de photo à afficher</p>';
                } else { // il y a des posts à afficher
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
    const filterSort = document.getElementById('sort-by');
    
    filterCategories.addEventListener('change', updatePhotos);
    filterFormats.addEventListener('change', updatePhotos);
    filterSort.addEventListener('change', updatePhotos);
    
    function updatePhotos() {
        const selectedCategorie = filterCategories.value;
        const selectedFormat = filterFormats.value;
        const selectedSort = filterSort.value;
    
        // construction de l'URL pour la requête AJAX en fonction des param choisis par l'utilisateur
        let url = `${ajaxurl}?action=get_posts_by_term&sort_by=${selectedSort}`;
        if (selectedCategorie !== '') {
            url += `&categorie_terms=${selectedCategorie}`;
        }
        if (selectedFormat !== '') {
            url += `&format_terms=${selectedFormat}`;
        }
    
        fetch(url)
            // réponse de la promesse retournée par la requête AJAX
            .then(response => response.text())
            .then(data => {
                const photosList = document.querySelector('.photos-list');
                photosList.innerHTML = data;
                offset = 8;
                morePosts = true;
                morePostsButtons.forEach(button => {
                    button.style.display = 'block';
                });
                load.innerHTML = '';
        });
    }
});