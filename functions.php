<?php
// définitions des styles
function nathalie_mota_enqueue_styles() {
    wp_enqueue_style( 'nathalie-mota-style', get_template_directory_uri() . '/assets/css/style.css' );
    wp_enqueue_style( 'ggl-font-space-mono', 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap', array(), null );
    wp_enqueue_style( 'ggl-font-poppins', 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap', array(), null );
}
add_action( 'wp_enqueue_scripts', 'nathalie_mota_enqueue_styles' );

// définitions des scripts
function nathalie_mota_enqueue_scripts() {
    wp_enqueue_script( 'custom-script', get_template_directory_uri() . '/assets/js/script.js', array(), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'nathalie_mota_enqueue_scripts' );

// titres dynamiques
add_theme_support('title-tag');

// gestion des menus
function nathalie_mota_register_nav_menu() {
    register_nav_menu( 'primary', __( 'Primary Menu', 'nathalie-mota' ) );
    register_nav_menu( 'footer', __( 'Footer Menu', 'nathalie-mota' ) );

}
add_action( 'after_setup_theme', 'nathalie_mota_register_nav_menu' );

function add_custom_menu_item( $items, $args ) {
    if ( $args->theme_location == 'primary' ) {
        $items .= '<li class="contact">CONTACT</li>';
    } elseif ( $args->theme_location == 'footer' ) {
        $items .= '<li>TOUS DROITS RÉSERVÉS</li>';
    }
    return $items;
}
add_filter( 'wp_nav_menu_items', 'add_custom_menu_item', 10, 2 );
