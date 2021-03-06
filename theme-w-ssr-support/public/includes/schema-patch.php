<?php

use GraphQLRelay\Relay;
use \WPGraphQL\Data\DataSource;

/**
 * Adds a few fields need by WPGraphQL-Composer v0.4.0 to the core WPGraphQL schema 
 */
function wp_graphql_schema_patch() {
  register_graphql_fields( 'Settings', [
    /** 
     * Defines the home_url setting
     */
    'homeUrl' => [
      'type' => 'String',
      'description' => __( 'The url to current site. Use this if site is a multisite' ),
      'resolve' => function() {
        return home_url();
      },
    ],
  ] );

  /** 
   * Holds the post type object permalink field
   */
  $permalink = [
    'type' 				=> 'String',
    'args' 				=> [
      'leavename' => [
        'type' 				=> 'Boolean',
        'description' => __( 'Whether to keep post name or page name' ),
      ],
    ],
    'description' 	=> __( 'The permalink to the post object' ),
    'resolve' => function( \WP_Post $post, $args ) {
      if ( ! empty( $args['leavename'] ) && $args['leavename'] ) {
        $leavename = true;
      } else {
        $leavename = false;
      }

      /**
      * Strip site url for routing use
      */
      $permalink = str_replace( home_url() . '/', '', get_permalink( $post, $leavename ) );
      return ( $permalink ) ? $permalink : null;
    },
  ];
  register_graphql_field( 'post', 'permalink', $permalink );
  register_graphql_field( 'page', 'permalink', $permalink );
  register_graphql_field( 'attachment', 'permalink', $permalink );

  $isGutenPost = [
    'type' 				=> 'Boolean',
    'description' 	=> __( 'Is post made with the Gutenberg' ),
    'resolve' => function( \WP_Post $post, $args ) {
      $is_guten_post = preg_match("/<!-- wp:(.*) -->/", $post->post_content ) ? true : false;
      return $is_guten_post;
    },
  ];
  register_graphql_field( 'post', 'isGutenPost', $isGutenPost );
  register_graphql_field( 'page', 'isGutenPost', $isGutenPost );
}
add_action( 'graphql_register_types', 'wp_graphql_schema_patch' );