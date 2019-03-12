<?php
/**
 * WPGraphQL Theme functions and definitions
 * 
 * @package wp_graphql
 */

$theme_name = 'WPGraphQL';
$theme_version = '1.0.0';

/**
 * @var app_context stores context for request
 */
$app_context = null;

/**
 * Theme constants
 */
if( ! defined( strtoupper( $theme_name ) . '_VERSION' ) ) {
	define( strtoupper( $theme_name ) . '_VERSION', $theme_version );
}
if( ! defined( strtoupper( $theme_name ) . '_PATH' ) ) {
	define( strtoupper( $theme_name ) . '_PATH', plugin_dir_path(__FILE__) );
}

/**
 * Sets up supports and registers menus
 */
function wp_graphql_theme_setup() {
	global $theme_name;
	/*
	* Make theme available for translation.
	* Translations can be filed in the /languages/ directory.
	*/
	load_theme_textdomain( $theme_name, get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	* Enable support for Post Thumbnails on posts and pages.
	*
	* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	*/
	add_theme_support( 'post-thumbnails' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support( 'custom-logo' );

	/**
	 * Register Menu
	 */
	register_nav_menus(
		[
			'main'	=> __( 'Main Menu' ),
			'social'	=> __( 'Social Links' ),
		]
	);

	// Adding support for core block visual styles.
	add_theme_support( 'wp-block-styles' );
	
	// Add support for custom color scheme.
	add_theme_support( 'editor-color-palette', array(
		array(
			'name'  => __( 'Strong Blue', 'gutenbergtheme' ),
			'slug'  => 'strong-blue',
			'color' => '#0073aa',
		),
		array(
			'name'  => __( 'Lighter Blue', 'gutenbergtheme' ),
			'slug'  => 'lighter-blue',
			'color' => '#229fd8',
		),
		array(
			'name'  => __( 'Very Light Gray', 'gutenbergtheme' ),
			'slug'  => 'very-light-gray',
			'color' => '#eee',
		),
		array(
			'name'  => __( 'Very Dark Gray', 'gutenbergtheme' ),
			'slug'  => 'very-dark-gray',
			'color' => '#444',
		),
	) );

	$GLOBALS['content_width'] = apply_filters( 'gutenbergtheme_content_width', 640 );

}
add_action( 'after_setup_theme', 'wp_graphql_theme_setup' );

/**
 * Register Google Fonts
 */
function wp_graphql_google_fonts_url() {
	$fonts_url = '';

	/*
	*Translators: If there are characters in your language that are not
	* supported by Noto Serif, translate this to 'off'. Do not translate
	* into your own language.
	*/
	$lang_compatible = esc_html_x( 'on', 'Google font: on or off', 'wp_graphql' );
	if ( 'off' !== $lang_compatible ) {

		$font_families = [];
		$font_families[] = 'Abril+Fatface|Aleo';

		$query_args = [
			'family' => urlencode( implode( '|', $font_families ) ),
			'subset' => urlencode( 'latin,latin-ext' ),
		];

		$fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );
	}

	return $fonts_url;
}

/**
 * Confirms url successful
 * 
 * @link https://stackoverflow.com/questions/7684771/how-to-check-if-a-file-exists-from-a-url#answer-29714882
 */
function wp_graphql_url_exists( $url ){
	$headers = get_headers( $url );
	return stripos( $headers[ 0 ],"200 OK" ) ? true : false;
}

function wp_graphql_get_context( $server = false ){
	global $app_context;
	$request_uri = $_SERVER['REQUEST_URI'];

	if ( $app_context === null ) {
		$app_context = [
			'HOME_URL'						=> home_url(),
			'APP_TITLE'						=> get_bloginfo( 'name' ),
			'LOCATION' 						=> $request_uri,
			'SERVER_SCRIPT_PATH' 	=> get_template_directory() . '/js/server.js',
			'CLIENT_SCRIPT_URI' 	=> get_template_directory_uri() . '/js/client.js',
			'VENDOR_SCRIPT_URI' 	=> get_template_directory_uri() . '/js/vendors~main.client.js',
			'STYLE_URI' 					=> get_template_directory_uri() . '/js/main.css',
		];
	}

	return array_merge(
		$app_context,
		[
			// in a local dev environment change home_url('/') to http://127.0.0.1/ and vice-versa
			'ENDPOINT' => ( $server ? 'http://127.0.0.1/' : home_url( '/' ) ) . apply_filters( 'graphql_endpoint', 'graphql' ),
		]
	);
}

/**
 * Queues up theme's CSS/JS dependencies.
 */
function wp_graphql_enqueue_scripts() {
	global $theme_version;

	// Get dependencies
	$style_deps = [];
	if( wp_graphql_url_exists( wp_graphql_google_fonts_url() ) ) {
		wp_enqueue_style( 'google-fonts', wp_graphql_google_fonts_url() );
		$style_deps[] = 'google-fonts';
	}

	// Get request context and enqueue required styles/scripts
	$context = wp_graphql_get_context();
	wp_enqueue_style(
		'wp-graphql-style',
		$context[ 'STYLE_URI' ],
		$style_deps
	);
	wp_enqueue_script(
		'wp-graphql-vendor',
		$context[ 'VENDOR_SCRIPT_URI' ],
		array(),
		$theme_version,
		true
	);
	wp_enqueue_script(
		'wp-graphql-client',
		$context[ 'CLIENT_SCRIPT_URI' ],
		array( 'wp-graphql-vendor' ),
		$theme_version,
		true
	);
	wp_localize_script( 'wp-graphql-client', 'context', $context );

	//Dequeue unnecessary scripts
	wp_dequeue_script( 'react' );
	wp_dequeue_script( 'react-dom' );
}
add_action( 'wp_enqueue_scripts', 'wp_graphql_enqueue_scripts' );

/**
 * Adds defer attribute to client side script tags
 */
function wp_graphql_defer_scripts( $tag, $handle, $src ) {
	// the handles of the enqueued scripts we want to async
	$async_scripts = array( 'wp-graphql-client' );

	if ( in_array( $handle, $async_scripts ) ) {
		return preg_replace('/(\'>)/', '\' defer>', $tag);
	}

	return $tag;
}
add_filter( 'script_loader_tag', 'wp_graphql_defer_scripts', 10, 3 );

require_once get_template_directory() . '/includes/core-settings-patch.php';
require_once get_template_directory() . '/includes/schema-patch.php';
require_once get_template_directory() . '/includes/send-inquiry-mutation.php';