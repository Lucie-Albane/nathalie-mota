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
        burgerMenu.classList.toggle('open');
    };
    burgerMenu.addEventListener('click', openBurgerMenu);

    if(contactPhoto) {
        contactPhoto.addEventListener('click', function () {
            const reference = contactPhoto.getAttribute('data-reference');
            openPopUpPhoto(reference);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // nombre de posts supplémentaires à afficher
    let offset = 8; 
    let morePosts = true;
    const morePostsButton = document.getElementById('more_posts');
    const load = document.querySelector('.load');
    morePostsButton.addEventListener('click', function() {
        if(morePosts) {
            // fetch = fonction JS qui permet de faire des requêtes http vers un serveur et récupérer des données
        fetch(ajaxurl, {
            // méthode http qui permet d'envoyer des données vers un serveur
            method: 'POST',
            // spécifie le type de données
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            // récupère "load more photos" du fichier functions.php + le nombre de posts à afficher
            body: 'action=load_more_photos&offset=' + offset
        })
        // gère les promesses renvoyées par fetch : il extrait le contenu de la promesse sous forme de texte 
        // (ici la requete ajax : la récupératoin de données)
        .then(response => response.text())
        // récupère le contenu de la réponse à la requête ajax et l'injecte dans la liste des photos
        .then(data => {
            if (data.trim() === '') {
                morePosts = false;
                morePostsButton.style.display = 'none';
                load.innerHTML += '<p> Il n\'y a plus de photo à afficher</p>';
            } else {
                const photosList = document.querySelector('.photos-list');
                photosList.innerHTML += data;
                offset += 8;
            }
        });
        }
    });
});