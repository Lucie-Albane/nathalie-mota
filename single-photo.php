<?php get_header(); ?>
<div class="main single-photo">
	<?php if (have_posts()) : ?>
	<?php while (have_posts()) : the_post(); ?>
	<?php
		// Champs ACF
		$reference_photo = "reference"; 
		$reference_value = get_field($reference_photo);

		$type_photo = "type";
		$type_value = get_field($type_photo);

		// Champs CPT UI
		$categorie_name = "categorie";
		$categorie_terms = get_the_terms(get_the_ID(), $categorie_name);

		$format_name = "format";
		$format_terms = get_the_terms(get_the_ID(), $format_name);

		// Champs année
		$year = get_the_date('Y');
		?>


	<div class="post-photo d-flex space-between">
		<div class="post-photo-left d-flex flex-col">
			<h1 class="post-photo-title"><?php the_title(); ?></h1>
			<div class="post-photo-text">
				<?php 
				// Affiche la référence de la photo
				if($reference_value) {
    				echo '<p>' . $reference_photo . ': ' . $reference_value . '</p>';
				} 

				// Affiche la catégorie de la photo
				if (! empty($categorie_terms) && ! is_wp_error($categorie_terms)) {
    				echo '<p>' . $categorie_name . ': ';
    			foreach ($categorie_terms as $categorie_terms) {
        			echo $categorie_terms->name . ' ';
    			}
    			echo '</p>';
				}

				// Affiche le format de la photo
				if (! empty($format_terms) && ! is_wp_error($format_terms)) {
    				echo '<p>' . $format_name . ': ';
    			foreach ($format_terms as $format_terms) {
        			echo $format_terms->name . ' ';
    			}
    			echo '</p>';
				}

				// Affiche le type de la photo
				if($type_value) {
    				echo '<p>' . $type_photo . ': ' . $type_value . '</p>';
				} 

				// Affiche l'anneé de la publication de la photo
				echo '<p>Année: ' . $year . '</p>';
				?>
			</div>
		</div>
		<div class="post-photo-image">
			<?php the_content(); ?>
		</div>
	</div>
	<div class="post-photo-contact d-flex">
		<p>Cette photo vous intéresse ?</p>
		<button class="contact single-contact-btn" data-reference="<?php echo $reference_value; ?>">Contact</button>
	</div>
	<div class="post-photo-similar">
		<h3>Vous aimerez aussi</h3>
	</div>

<?php endwhile; ?>
<?php endif; ?>
</div>
<?php get_footer(); ?>