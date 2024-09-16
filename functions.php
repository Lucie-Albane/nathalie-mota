<?php
// définitions des styles
function nathalie_mota_enqueue_styles() {
    wp_enqueue_style( 'nathalie-mota-style', get_stylesheet_directory_uri() . '/style.css' );
    wp_enqueue_style( 'ggl-font-space-mono', 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap', array(), null );
    wp_enqueue_style( 'ggl-font-poppins', 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap', array(), null );
}
add_action( 'wp_enqueue_scripts', 'nathalie_mota_enqueue_styles' );

// définitions des scripts
function my_theme_enqueue_scripts() {
    wp_enqueue_script( 'custom-script', get_template_directory_uri() . '/assets/js/script.js', array(), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_scripts' );

// titres dynamiques
add_theme_support('title-tag');