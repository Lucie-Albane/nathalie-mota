<?php get_header(); ?>
<div class="hero-header d-flex justify-center align-center">
    <h1 class="hero-title">PHOTOGRAPHE EVENT</h1>
    <?php $args = array (
		'post_type' => 'photo',
        'posts_per_page' => 1,
		'orderby' => 'rand'
	);
	$random_photo = new WP_Query($args);

    if($random_photo->have_posts()){
        while ($random_photo->have_posts()) {
            $random_photo->the_post();
            echo the_content();
        }
    } ?>
</div>

<?php get_footer(); ?>