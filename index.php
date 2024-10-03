<?php get_header(); ?>
<div class="hero-header d-flex justify-center align-center">
    <h1 class="hero-title">PHOTOGRAPHE EVENT</h1>
    <?php $args = array (
		'post_type' => 'photo',
        'posts_per_page' => 1,
		'orderby' => 'rand',
        'tax_query' => array(
			array (
				'taxonomy' => 'format',
				'field' => 'slug',
				'terms' => 'paysage'
			),
		)
	);
	$random_photo = new WP_Query($args);

    if($random_photo->have_posts()){
        while ($random_photo->have_posts()) {
            $random_photo->the_post();
            echo the_content();
        }
    } ?>
</div>

<div class="filters-and-photos d-flex flex-col">
    <div class="sort-and-filters d-flex justify-center">
        <div class="all-filters d-flex space-between flex-col-mobile">
            <div class="filters d-flex flex-col-mobile">
                <select name="filter-categories" id="filter-categories">
                    <option value="">CATÉGORIE</option>
                    <?php 
		                $terms = get_terms( array(
                            'taxonomy' => 'categorie',
                            'hide_empty' => false,
                        ) );
                        
                        if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
                            foreach ( $terms as $term ) {
                                echo '<option value=' . $term->name . '>' . $term->name . '</option>';
                            }
                        }
                    ?>
                </select>
                
                <select name="filter-formats" id="filter-formats">
                    <option value="">FORMATS</option>
                    <?php 
		                $terms = get_terms( array(
                            'taxonomy' => 'format',
                            'hide_empty' => false,
                        ) );
                        
                        if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
                            foreach ( $terms as $term ) {
                                echo '<option value=' . $term->name . '>' . $term->name . '</option>';
                            }
                        }
                    ?>
                </select> 
            </div>
            <div class="sort">
                <select name="sort-by" id="sort-by">
                    <option value="">TRIER PAR</option>
                    <option value="asc">Du plus ancien au plus récent</option>
                    <option value="desc">Du plus récent au plus ancien</option>
                </select>
            </div>
        </div>
    </div>

    <div class="photos-list d-flex space-between">
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
        wp_reset_postdata(); ?>
    </div>
</div>
<div class="load d-flex justify-center">
    <button id="more_posts" class="load-btn">Charger plus</button>
    <p class="display-msg">Il n'y a pas de photo à afficher</p>
</div>
</div>
<?php get_footer(); ?>