document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.querySelector('.lightbox-overlay');
    //const openLightBoxIcons = document.querySelectorAll('.fullscreen');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeLightBoxIcon = document.querySelector('.lightbox-close');
    const photosList = document.querySelector('.photos-list');

    // stocke toutes les images et l'index de l'image courante
    let images = [];
    let currentIndex = -1;

    // gestion des références et catégories
    const lightboxRef = document.querySelector('.lightbox-ref');
    const lightboxCategory = document.querySelector('.lightbox-categorie');

    // ouvre la lightbox avec un tableau d'images et un index spécifique
    function openLightBox(imageIndex, imagesArray) {
        images = imagesArray;  // toutes les images dans le tableau
        currentIndex = imageIndex;  // initialise l'index courant

        // affiche l'image correspondant à l'index courant
        lightboxImage.src = images[currentIndex];

        // récupère les données de ref et catégorie
        const currentIcon = photosList.querySelectorAll('.fullscreen')[currentIndex];
        const currentRef = currentIcon.getAttribute('data-ref');
        const currentCategory = currentIcon.getAttribute('data-category');

        // mise à jour des ref et catégorie dans la lightbox
        lightboxRef.textContent = currentRef;
        lightboxCategory.textContent = currentCategory;

        lightbox.style.display = 'flex';
        updateNavButtons();

        // Ajoute la classe qui désactive le défilement du body
        document.body.classList.add('no-scroll');
        
    }

    function closeLightBox() {
        lightbox.style.display = 'none';
        lightboxImage.src = '';
        lightboxRef.textContent = '';
        lightboxCategory.textContent = '';
        // Supprime la classe qui désactive le défilement du body
        document.body.classList.remove('no-scroll');
    }

    // gestion des btn de nav 
    function updateNavButtons() {
        const prevButtons = document.querySelectorAll('.lightbox-precedent');
        const nextButtons = document.querySelectorAll('.lightbox-suivant');

        prevButtons.forEach(button => {
            if(currentIndex === 0) {
                button.style.opacity = '0';
            } else {
                button.style.opacity = '1';
            }
        });

        nextButtons.forEach(button => {
            if(currentIndex === images.length -1) {
                button.style.opacity = '0';
            } else {
                button.style.opacity = '1';
            }
        });
    }

    // mise à jour de la lightbox avec l'image précédente
    function showPrevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            lightboxImage.src = images[currentIndex];

            // mise à jour des ref et catégorie de l'image précédente
            const currentIcon = photosList.querySelectorAll('.fullscreen')[currentIndex];
            const currentRef = currentIcon.getAttribute('data-ref');
            const currentCategory = currentIcon.getAttribute('data-category');

            // mise à jour des ref et catégorie dans la lightbox
            lightboxRef.textContent = currentRef;
            lightboxCategory.textContent = currentCategory; 
            updateNavButtons();
        }
    }

    // mise à jour de la lightbox avec l'image suivante
    function showNextImage() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            lightboxImage.src = images[currentIndex];

            // mise à jour des ref et catégorie de l'image précédente
            const currentIcon = photosList.querySelectorAll('.fullscreen')[currentIndex];
            const currentRef = currentIcon.getAttribute('data-ref');
            const currentCategory = currentIcon.getAttribute('data-category');

            // mise à jour des ref et catégorie dans la lightbox
            lightboxRef.textContent = currentRef;
            lightboxCategory.textContent = currentCategory;
            updateNavButtons();
        }
    }

    // Event delegation pour ouvrir la lightbox (l'event remonte dans le DOM)
    photosList.addEventListener('click', function (event) {
        // vérifie que le click sur photosList provient bien de l'icône fullscreen 
        if (event.target.classList.contains('fullscreen')) {
            // stocke la ref de l'icône cliquée
            const icon = event.target;

            // crée le tableau en : 
            // 1- convertissant toutes les icônes FS à l'intérieur de photosList en tableau
            const imagesArray = Array.from(photosList.querySelectorAll('.fullscreen'))
            // 2- créant un nouveau tableau à partir de tableau d'icônes FS 
            // pour chq icônes elle extrait la valeur de data-image (l'url de l'image courante)
            .map(icon => icon.getAttribute('data-image'));

            // crée un tableau d'icônes et extrait l'index de chacune
            const imageIndex = Array.from(photosList.querySelectorAll('.fullscreen')).indexOf(icon);  // récupère l'index de l'icône cliquée

            // si l'index du tableau d'url d'images est valide, alors exécute la fonction d'ouverture d'image correspondante
            if (imagesArray[imageIndex]) {
                openLightBox(imageIndex, imagesArray);
            }
        }
    });

    const prevButtons = document.querySelectorAll('.lightbox-precedent');
    prevButtons.forEach(button => {
        button.addEventListener('click', showPrevImage);
    });

    const nextButtons = document.querySelectorAll('.lightbox-suivant');
    nextButtons.forEach(button => {
        button.addEventListener('click', showNextImage);
    });

    closeLightBoxIcon.addEventListener('click', closeLightBox);
});