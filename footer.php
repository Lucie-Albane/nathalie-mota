</div><!-- #page -->
<?php get_template_part( 'template_parts/contact' ); ?>
<?php wp_footer(); ?>
<div class="footer-wrapper d-flex justify-center">
    <?php wp_nav_menu( array(
            'theme_location' => 'footer',
            'container' => 'footer',
            'menu_class' => 'footer-menu-items'
        ) );
    ?>
</div> <!-- .footer-wrapper -->
</body>
</html>