<?php
get_header();
?>

<div id="primary" class="content-area">
    <main id="main" class="site-page-main" role="main">

        <?php
        while ( have_posts() ) :
            the_post();

            // Display the page title
            the_title( '<h1 class="entry-title">', '</h1>' );

            // Display the page content
            the_content();

            // If comments are open or we have at least one comment, load up the comment template.
            if ( comments_open() || get_comments_number() ) :
                comments_template();
            endif;

        endwhile; // End of the loop.
        ?>

    </main><!-- #main -->
</div><!-- #primary -->

<?php
get_footer();