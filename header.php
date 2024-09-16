<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
    <div class="header-wrapper d-flex space-around">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" class="logo" alt="logo de Nathalie Mota">
	    <nav id="site-navigation" class="primary-navigation">
		<?php
		wp_nav_menu( array(
            'theme_location' => 'primary',
            'container' => 'nav',
            'container_class' => 'primary-menu-list'
        ) );
		?>
	    </nav><!-- #site-navigation -->
    </div> <!-- .header-wrapper -->
	<?php