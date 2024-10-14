<?php
// ***** ajout d'images mises en avant *****
function nathalie_mota_theme_setup() {
    add_theme_support('post-thumbnails');
    add_theme_support('post-thumbnails', array('post', 'page', 'photo'));
}
add_action('after_setup_theme', 'nathalie_mota_theme_setup');

// ***** définitions des styles *****
function nathalie_mota_enqueue_styles() {
    // style global
    wp_enqueue_style('nathalie-mota-style', get_template_directory_uri() . '/style.css');

    // lightbox style
    wp_enqueue_style('lightbox-style', get_template_directory_uri() . '/assets/css/lightbox.css');

    // filtres et tri style
    wp_enqueue_style('sort-and-filters', get_template_directory_uri() . '/assets/css/sort-and-filters.css');

    // liste des photos style
    wp_enqueue_style('photos-list', get_template_directory_uri() . '/assets/css/photos-list.css');

    // hero header style
    wp_enqueue_style('hero-header', get_template_directory_uri() . '/assets/css/hero-header.css');

    // photo block style
    wp_enqueue_style('photo-block', get_template_directory_uri() . '/assets/css/photo-block.css');

    // single photo style (CPT photo single)
    wp_enqueue_style('single-photo', get_template_directory_uri() . '/assets/css/single-photo.css');

    // header & footer style
    wp_enqueue_style('header-footer', get_template_directory_uri() . '/assets/css/header-footer.css');

    // contact pop-up style
    wp_enqueue_style('contact-popup', get_template_directory_uri() . '/assets/css/contact-popup.css');





    wp_enqueue_style('ggl-font-space-mono', 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap', array(), null);
    wp_enqueue_style('ggl-font-poppins', 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap', array(), null);
}
add_action('wp_enqueue_scripts', 'nathalie_mota_enqueue_styles');

// ***** définitions des scripts *****
function nathalie_mota_enqueue_scripts() {
    wp_enqueue_script('custom-script', get_template_directory_uri() . '/assets/js/script.js', array(), '1.0', true);
    wp_enqueue_script('lightbox', get_template_directory_uri() . '/assets/js/lightbox.js', array(), '1.0', true);
}
add_action( 'wp_enqueue_scripts', 'nathalie_mota_enqueue_scripts' );

// ***** titres dynamiques *****
add_theme_support('title-tag');

// ***** gestion des menus *****
function nathalie_mota_register_nav_menu() {
    register_nav_menu('primary', __('Primary Menu', 'nathalie-mota'));
    register_nav_menu('footer', __('Footer Menu', 'nathalie-mota'));
}
add_action('after_setup_theme', 'nathalie_mota_register_nav_menu');

function add_custom_menu_item( $items, $args) {
    if ($args->theme_location == 'primary') {
        $items .= '<li class="contact">CONTACT</li>';
    } elseif ($args->theme_location == 'footer') {
        $items .= '<li>TOUS DROITS RÉSERVÉS</li>';
    }
    return $items;
}
add_filter('wp_nav_menu_items', 'add_custom_menu_item', 10, 2);

// ***** Chargement des photos avec filtres et pagination *****
function load_photos() {
    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0; // récupère l'offset
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 8,
        'offset' => $offset,
        'orderby' => 'date',
    );

    // Récupération des filtres
    if (!empty($_GET['categorie_terms'])) {
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie',
            'field' => 'name',
            'terms' => sanitize_text_field($_GET['categorie_terms']),
        );
    }

    if (!empty($_GET['format_terms'])) {
        $args['tax_query'][] = array(
            'taxonomy' => 'format',
            'field' => 'name',
            'terms' => sanitize_text_field($_GET['format_terms']),
        );
    }

    if (!empty($_GET['sort_by'])) {
        $args['order'] = sanitize_text_field($_GET['sort_by']);
    }

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            get_template_part('template_parts/photo_block');
        }
    }

    wp_reset_postdata();
    wp_die();
}
add_action('wp_ajax_load_photos', 'load_photos');
add_action('wp_ajax_nopriv_load_photos', 'load_photos');


// ***** Filtrage des photos de la page d'accueil *****
function get_posts_by_term() {
    // récupère les valeurs des select
    $categorie_terms = sanitize_text_field($_GET['categorie_terms']);
    $format_terms = sanitize_text_field($_GET['format_terms']);
    $sort_by = sanitize_text_field($_GET['sort_by']);
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 8,
        'offset' => 0, // ne zappe aucune photo
        'orderby' => 'date',
        'tax_query' => array(
            'relation' => 'AND',
        ),
    );

    // si la valeur du select n'est pas vide, c'est que l'utilisateur l'a sélectionné
    if (!empty($categorie_terms)) {
        // ajoute les éléments de la catégorie sélectionnée au tableau tax_query
        $args['tax_query'][] = array(
            'taxonomy' => 'categorie',
            'field' => 'name',
            'terms' => $categorie_terms,
        );
    }
    if (!empty($format_terms)) {
        // ajoute les éléments du format sélectionné au tableau tax_query
        $args['tax_query'][] = array(
            'taxonomy' => 'format',
            'field' => 'name',
            'terms' => $format_terms,
        );
    }
    if (!empty($sort_by)) {
        // défini l'ordre des postes en fonction de ce qui a été choisi par l'utilisateur dans le select
        $args['order'] = $sort_by;
    }

    // crée la requête avec les arguments définis ci dessus
    $query = new WP_Query($args);

    // affiche les photos correspondant à la requête
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            get_template_part('template_parts/photo_block');
        }
    }
    // restaure l'état d'origine pour faire fonctionner les autres requêtes correctement
    wp_reset_postdata();
    wp_die();
}
add_action('wp_ajax_get_posts_by_term', 'get_posts_by_term');
add_action('wp_ajax_nopriv_get_posts_by_term', 'get_posts_by_term');

// ***** Récupérer tous les posts *****
function get_all_posts() {
    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => 8,
    );
    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            get_template_part('template_parts/photo_block');
        }
    }
    // restaure l'état d'origine pour faire fonctionner les autres requêtes correctement
    wp_reset_postdata();
    wp_die();
}
add_action('wp_ajax_get_all_posts', 'get_all_posts');
add_action('wp_ajax_nopriv_get_all_posts', 'get_all_posts');