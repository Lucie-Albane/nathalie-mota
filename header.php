<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
	<script>
		var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
	</script>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
    <div class="header-wrapper d-flex space-around align-center">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" class="logo" alt="logo de Nathalie Mota">
	    <div id="site-navigation" class="primary-navigation">
		<?php
		wp_nav_menu( array(
            'theme_location' => 'primary',
            'container' => 'nav',
            'container_class' => 'primary-menu-list'
        ) );
		?>
	    </div><!-- #site-navigation -->
		<div id="site-navigation-mobile" class="mobile-navigation">
			<div class="burger-menu"></div>
		<?php
		wp_nav_menu( array(
            'theme_location' => 'primary',
            'container' => 'nav',
            'container_class' => 'primary-menu-mobile'
        ) );
		?>
		</div><!-- #site-navigation-mobile -->
    </div> <!-- .header-wrapper -->
	<?php