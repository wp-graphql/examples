<?php 
require_once 'vendor/autoload.php';

use Spatie\Ssr\Renderer;
use Spatie\Ssr\Engines\Node;

$nodePath = getenv('NODE_PATH') ?: '/usr/bin/node';
$tempPath = sys_get_temp_dir();
$context = wp_graphql_get_context(true);

$engine = new Node($nodePath, $tempPath);
$renderer = new Renderer($engine);
$app = json_decode(
  $renderer
    ->entry( $context[ 'SERVER_SCRIPT_PATH' ] )
    ->context( $context )
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
    <?php wp_head(); ?>
    <title><?php bloginfo( 'name' ) ?></title>
    <?php if( isset( $app['style'] ) ) {
        echo $app['style'];
      }
    ?>
    <?php if( isset( $app['state'] ) ): ?>
      <script>
        window.APOLLO_STATE = <?php echo json_encode( $app['state'] ); ?>;
      </script>
    <?php endif; ?>
  </head>
  <body <?php body_class(); ?>>
    <?php if( WP_DEBUG && isset( $app['error'] ) ): ?>
      <pre>
        <?php print_r( [ $app['error'], $context ] ); ?>
      </pre>
    <?php else : ?>
      <div id="root"><?php echo $app['content']; ?></div>
    <?php 
          wp_footer();
          endif;
    ?>
  </body>
</html>
