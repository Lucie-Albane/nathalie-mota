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
            <!-- TODO : menu dynamique une fois les pages créées, le menu ci dessous n'est là que pour la création du design -->
             <ul class="primary-menu-list d-flex">
                <li> ACCUEIL </li>
                <li> A PROPOS </li>
                <li> CONTACT </li>
            </ul>
		<?php
		wp_nav_menu(
			array(
				'theme_location'  => 'primary',
				'menu_class'      => 'menu-wrapper',
				'container_class' => 'primary-menu-container',
				'items_wrap'      => '<ul id="primary-menu-list" class="%2$s">%3$s</ul>',
				'fallback_cb'     => false,
			)
		);
		?>
	    </nav><!-- #site-navigation -->
    </div> <!-- .header-wrapper -->
	<?php