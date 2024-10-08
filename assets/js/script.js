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
    let offset = 8;  // nombre de posts déjà chargés sur la page
    let morePosts = true;
    const morePostsButton = document.getElementById('more_posts');
    const displayMsg = document.querySelector('.display-msg');
    displayMsg.style.display = 'none';

    // Fonction unique pour charger les photos
    function loadPhotos(isLoadMore = false) {
        
        const selectedCategorie = document.getElementById('filter-categories').value;
        const selectedFormat = document.getElementById('filter-formats').value;
        const selectedSort = document.getElementById('sort-by').value;

        // construction de l'URL pour la requête AJAX
        let url = `${ajaxurl}?action=load_photos&offset=${isLoadMore ? offset : 0}`;
    
        // Ajout des paramètres de filtre
        if (selectedCategorie !== '') {
            url += `&categorie_terms=${encodeURIComponent(selectedCategorie)}`;
        }
        if (selectedFormat !== '') {
            url += `&format_terms=${encodeURIComponent(selectedFormat)}`;
        }
        if (selectedSort !== '') {
            url += `&sort_by=${encodeURIComponent(selectedSort)}`;
        }

        fetch(url)
            .then(response => response.text())
            .then(data => {
                if (data.trim() === '') { // si réponse vide (il n'y a plus de posts à afficher)
                    morePosts = false;
                    morePostsButton.style.display = 'none';
                    displayMsg.style.display = 'block';
                } else { // il y a des posts à afficher
                    const photosList = document.querySelector('.photos-list');
                    if (!isLoadMore) {
                        // Si ce n'est pas un chargement de plus, on remplace le contenu
                        photosList.innerHTML = data; 
                    } else {
                        // Sinon, on ajoute les nouvelles photos
                        photosList.innerHTML += data;
                    }
                    offset += 8; // Incrémente l'offset de 8
                    morePostsButton.style.display = 'block';
                    displayMsg.style.display = 'none';
                }
            });
    }

    // Écouteur pour le bouton "Charger plus"
    morePostsButton.addEventListener('click', () => loadPhotos(true));

    // Écouteurs pour les filtres
    document.getElementById('filter-categories').addEventListener('change', function() {
        offset = 8; 
        morePosts = true; 
        morePostsButton.style.display = 'block'; 
        displayMsg.style.display = 'none';
        loadPhotos(); 
    });
    document.getElementById('filter-formats').addEventListener('change', function() {
        offset = 8; 
        morePosts = true;
        morePostsButton.style.display = 'block';
        displayMsg.style.display = 'none';
        loadPhotos();
    });
    document.getElementById('sort-by').addEventListener('change', function() {
        offset = 8; 
        morePosts = true; 
        morePostsButton.style.display = 'block'; 
        displayMsg.style.display = 'none';
        loadPhotos(); 
    });
});


