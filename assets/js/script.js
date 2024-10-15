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
        const selectedCategorie = document.querySelector('.select-categorie .selected').getAttribute('data-value') || '';
        const selectedFormat = document.querySelector('.select-formats .selected').getAttribute('data-value') || '';
        const selectedSort = document.querySelector('.select-sort-by .selected').getAttribute('data-value') || '';

        // Construction de l'URL pour la requête AJAX
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
                if (data.trim() === '') { // Si réponse vide
                    morePosts = false;
                    morePostsButton.style.display = 'none';
                    displayMsg.style.display = 'block';
                } else {
                    const photosList = document.querySelector('.photos-list');
                    if (!isLoadMore) {
                        photosList.innerHTML = data; 
                    } else {
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

    // ----- DROPDOWNS : ----- 
    // Fonction pour ouvrir/fermer les dropdowns
    function toggleDropdown(dropdown) { // dropdown = la liste à ouvrir ou à fermer
        dropdown.classList.toggle('open');
        const allDropdowns = document.querySelectorAll('.dropdown');// Ferme les autres dropdowns
        
        allDropdowns.forEach((otherDropdown) => { // parmi toutes les listes,
            if (otherDropdown !== dropdown) { // si otherdropdown n'est pas la liste actuelle,
                otherDropdown.classList.remove('open'); // on ferme les autres
            }
        });
    }

    // Gestion des clics sur les faux selects
    const dropdownCategories = document.querySelector('.dropdown-categorie');
    const dropdownFormats = document.querySelector('.dropdown-formats');
    const dropdownSortBy = document.querySelector('.dropdown-sort-by');

    dropdownCategories.querySelector('.select').addEventListener('click', function () {
        toggleDropdown(dropdownCategories);
    });

    dropdownFormats.querySelector('.select').addEventListener('click', function () {
        toggleDropdown(dropdownFormats);
    });

    dropdownSortBy.querySelector('.select').addEventListener('click', function () {
        toggleDropdown(dropdownSortBy);
    });

    // Gestion des clics sur les éléments de sélection :
    // Au clic sur chaque item de la liste
    dropdownCategories.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function () {
            const value = this.getAttribute('data-value'); // on récup la valeur de l'élément cliqué (this = le li cliqué)
            dropdownCategories.querySelector('.selected').setAttribute('data-value', value); // on change l'attribut 'data-value' de l'élément sélectionné

            // Met à jour le texte affiché
            const selectedElement = dropdownCategories.querySelector('.selected'); // Sélectionne l'élément affichant le texte
            if (value) { // vérifie si value existe
                selectedElement.innerText = value; // met à jour le texte avec 'value'
            } else {
                selectedElement.innerText = 'CATEGORIE';// sinon, met à jour le texte avec 'CATEGORIE'
            }

            // Réinitialise l'offset et d'autres variables pour charger les photos
            offset = 0; 
            morePosts = true; 
            morePostsButton.style.display = 'block'; 
            displayMsg.style.display = 'none';
        
            // Charge les photos avec les nouveaux filtres
            loadPhotos(); 
        
            // Ferme le dropdown après sélection
            dropdownCategories.classList.remove('open');
        });
    });

    // Au clic sur chaque item de la liste
    dropdownFormats.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            dropdownFormats.querySelector('.selected').setAttribute('data-value', value); // on change l'attribut 'data-value' de l'élément sélectionné

            // Met à jour le texte affiché 
            const selectedElement = dropdownFormats.querySelector('.selected'); // selectionne l'élement affichant le texte
             if (value) { // vérifie si value existe
                selectedElement.innerText = value; // met à jour le texte avec 'value'
            } else {
                selectedElement.innerText = 'FORMATS'; // sinon, met à jour le texte avec 'FORMATS'
            }

            // Réinitialise l'offset et d'autres variables pour charger les photos
            offset = 0; 
            morePosts = true; 
            morePostsButton.style.display = 'block'; 
            displayMsg.style.display = 'none';

            // Charge les photos avec les nouveaux filtres
            loadPhotos(); 

            // Ferme le dropdown après sélection
            dropdownFormats.classList.remove('open');
        });
    });

    // Au clic sur chaque item de la liste
    dropdownSortBy.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function () {
            const value = this.getAttribute('data-value');  // on récup la valeur de l'élément cliqué (this = le li cliqué)
            dropdownSortBy.querySelector('.selected').setAttribute('data-value', value); // on change l'attribut 'data-value' de l'élément sélectionné
            
            // Met à jour le texte affiché avec le texte de l'élément sélectionné dropdownSortBy.querySelector('.selected').innerText = this.innerText; 
            
            // Met à jour le texte affiché 
            const selectedElement = dropdownSortBy.querySelector('.selected'); // selectionne l'élement affichant le texte
            // Vérifie si value est vide
            if (value === "") { 
                selectedElement.innerText = 'TRIER PAR'; // sinon, met à jour le texte avec 'TRIER PAR'
            } else {
                selectedElement.innerText = this.innerText; // met à jour le texte avec l'élément sélectionné
            }

            // Réinitialise l'offset et d'autres variables pour charger les photos
            offset = 0; 
            morePosts = true; 
            morePostsButton.style.display = 'block'; 
            displayMsg.style.display = 'none';

            // Charge les photos avec les nouveaux filtres
            loadPhotos(); 

            // Ferme le dropdown après sélection
            dropdownSortBy.classList.remove('open'); 
        });
    });

    // Ferme les dropdowns quand on clique à l'extérieur
    // event = element cliqué
    document.addEventListener('click', function(event)  {
        // vérifie que l'element cliqué n'est pas une des 3 dropdowns pour qu'elles restent ouvertes lors de l'interaction
        if (!dropdownCategories.contains(event.target) && !dropdownFormats.contains(event.target) && !dropdownSortBy.contains(event.target)) {
            // et si ce n'est pas le cas, on retire la classe open pour fermer la liste
            dropdownCategories.classList.remove('open');
            dropdownFormats.classList.remove('open');
            dropdownSortBy.classList.remove('open');
        }
    });
});

