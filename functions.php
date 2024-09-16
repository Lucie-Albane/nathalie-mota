<?php
// définitions des styles
function nathalie_mota_enqueue_styles() {
    wp_enqueue_style( 'nathalie-mota-style', get_stylesheet_directory_uri() . '/style.css' );
    wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap', array(), null );
}
add_action( 'wp_enqueue_scripts', 'nathalie_mota_enqueue_styles' );

// titres dynamiques
add_theme_support('title-tag');