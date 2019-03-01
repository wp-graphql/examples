<?php 
require_once 'vendor/autoload.php';

use Spatie\Ssr\Renderer;
use Spatie\Ssr\Engines\Node;

$nodePath = getenv('NODE_PATH') ?: '/usr/bin/node';
$tempPath = sys_get_temp_dir();
$context = wp_graphql_get_context();

$engine = new Node($nodePath, $tempPath);
$renderer = new Renderer($engine);
$app = json_decode(
  $renderer
    ->entry( $context[ 'SERVER_SCRIPT_PATH' ] )
    ->context( $context )
    ->fallback( '<div id="root"></div>' )
    ->debug()
    ->render(),
  true
);
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri() . '/favicon.ico'; ?>">
    <?php 
      wp_head();
      echo $app['styling'];
    ?>
    <title><?php bloginfo( 'name' ) ?></title>
  </head>
  <body <?php body_class(); ?>>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <?php echo $app['markup']; ?>
    <?php wp_footer(); ?>
  </body>
</html>
