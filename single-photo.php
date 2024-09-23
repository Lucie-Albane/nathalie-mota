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
	<div class="d-flex">
		<div class="post-photo-contact d-flex">
			<p>Cette photo vous intéresse ?</p>
			<button class="contact single-contact-btn" data-reference="<?php echo $reference_value; ?>">Contact</button>
		</div>
		<div class="post-photo-navigation d-flex">
		<?php 
		$next_photo = get_next_post();
		$previous_photo = get_previous_post();
		
		$prev_text = 'PRECEDENT';
		if (is_object($previous_photo)) {
			$prev_text .= '<span class="post-photo-navigation-thumbnail">' . get_the_post_thumbnail($previous_photo->ID,'thumbnail') . '</span>';
		}
		
		$next_text = 'SUIVANT';
		if (is_object($next_photo)) {
			$next_text .= '<span class="post-photo-navigation-thumbnail">' . get_the_post_thumbnail($next_photo->ID,'thumbnail') . '</span>';
		}
		
		the_post_navigation( array(
			'prev_text'  => __( $prev_text ),
			'next_text'  => __( $next_text ),
		) );
		?>
		</div>
	</div>
	<?php 
	$args = array (
		'post_type' => 'photo',
		'posts_per_page' => 2,
		'post__not_in' => array(get_the_ID()),
		'tax_query' => array(
			array (
				'taxonomy' => 'categorie',
				'field' => 'slug',
				'terms' => $categorie_terms,
			),
		)
	);
	$similar_photos = new WP_Query($args);

	?>
	<?php 
		if ($similar_photos->have_posts()) {
			echo '<div class="post-photo-similar">
		<h3>Vous aimerez aussi</h3>
		<div class="post-photo-similar-images d-flex space-between">';
			while ($similar_photos->have_posts()) {
				$similar_photos->the_post();
	?>
	<?php get_template_part('template_parts/photo_block'); ?>
	<?php
			}
		}
		wp_reset_postdata();
	?>
		</div>
	</div>

<?php endwhile; ?>
<?php endif; ?>
</div>
<?php get_footer(); ?>