<?php
	// Champs ACF
	$reference_photo = "reference"; 
	$reference_value = get_field($reference_photo);

	// Champs CPT UI
	$categorie_name = "categorie";
	$categorie_terms = get_the_terms(get_the_ID(), $categorie_name);

    // Récupère l'URL de l'image
    $image_url = get_the_post_thumbnail_url();

    // Récupère les posts précédents et suivants
    $previous_post = get_previous_post();
    $next_post = get_next_post();

    // URL du post précédent et suivant (si il y en a)
    $previous_post_url = null;
    $next_post_url = null;

    if($previous_post) {
        $previous_post_url = get_the_post_thumbnail_url($previous_post->ID);
    } else {
        $previous_post_url = null;
    }

    if($next_post) {
        $next_post_url = get_the_post_thumbnail_url($next_post->ID);
    } else {
        $next_post_url = null;
    }
?>
<div class="photo-block">
    <?php the_content() ?>
    <div class="photo-block-overlay d-flex flex-col space-between">
        <div class="fullscreen-icon d-flex">
            <div class="fs-bg d-flex justify-center align-center">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/FS.png" class="fullscreen" alt="Voir en plein écran"
            data-image="<?php echo $image_url; ?>"
            data-prev-url="<?php echo $previous_post_url; ?>"
            data-next-url="<?php echo $next_post_url; ?>"
            data-ref="<?php echo $reference_value; ?>"
            data-category="<?php echo get_the_terms(get_the_ID(), 'categorie')[0]->name; ?>"
            >
            </div>
        </div>
        <div class="info-icon d-flex justify-center"><a href="<?php the_permalink();?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/images/oeil.png" class="eye-icon" alt="Voir les détails"></a></div>
        <div class="info-photo d-flex space-between">
            <p><?php if($reference_value) { echo $reference_value;} ?></p>
            <p><?php 				
                if (! empty($categorie_terms) && ! is_wp_error($categorie_terms)) {
    			    foreach ($categorie_terms as $categorie_terms) {
        			    echo $categorie_terms->name;
    			};} ?></p>
        </div>
    </div>
</div>