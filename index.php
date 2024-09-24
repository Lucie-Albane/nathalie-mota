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
<div class="photos-list d-flex justify-center">
<?php $args = array (
		'post_type' => 'photo',
        'posts_per_page' => 8,

	);
	$all_photos = new WP_Query($args);

    if ($all_photos->have_posts()) {
        while ($all_photos->have_posts()) {
            $all_photos->the_post();
?>
<?php get_template_part('template_parts/photo_block'); ?>
<?php
        }
    }
    wp_reset_postdata();
?>
</div>
<div class="load d-flex justify-center">
    <button id="more_posts" class="load-btn">Charger plus</button>
</div>

<?php get_footer(); ?>