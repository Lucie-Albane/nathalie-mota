<?php
	// Champs ACF
	$reference_photo = "reference"; 
	$reference_value = get_field($reference_photo);

	// Champs CPT UI
	$categorie_name = "categorie";
	$categorie_terms = get_the_terms(get_the_ID(), $categorie_name);
?>
<div class="photo-block">
    <?php the_content() ?>
    <div class="photo-block-overlay d-flex flex-col space-between">
        <div class="fullscreen-icon d-flex">FS</div>
        <div class="info-icon d-flex justify-center"><a href="<?php the_permalink();?>">OEIL</a></div>
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