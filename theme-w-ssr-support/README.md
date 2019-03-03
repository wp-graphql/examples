![logo](public/logo.svg)
# WPGraphQL Theme with Server-Side Rendering
An example wordpress theme that loads a React.js SPA and retrieved data from WPGraphQL using WPGraphQL Composer component library. The SPA is loaded server-side using the [spatie/server-side-rendering](https://github.com/spatie/server-side-rendering) package's Node engine. It also contains examples of for modifying WPGraphQL's schema.

## Features
- Docker compose file for testing.
- Sass support

## Usage
1. Clone repository `git clone https://github.com/kidunot89/oil-based-boilerplate`.
2. Run `composer install` in the public directory in project working directory
3. Run `npm install && npm run docker-vols && npm run build` in project working directory.
4. (Docker only *Docker-Compose required*) Run `npm run start-docker` in project working directory.
4. (Local Installation) Run `npm run link-wp -- <path-to-wp-install> <path-to-plugins> <path-to-themes>` in project working directory.
5. Run `npm start` in project working directory.
6. Navigate to `http://localhost:8088/` and run through the installation.
7. Activate `WPGraphQL` in `Plugins` as well as `WPGraphQL Examples` in `Themes`.
8. Navigate to "Permalink" under "Settings" and set "Common Settings" to anything but "Plain".
9. Load or create Posts using editor or WordPress importer.
10. Set an menu to the `main` location.
11. Now you ready to code. Run `npm run stop-docker` in project working directory to stop and destroy docker containers.

### Usage w/o Docker
The `link-wp` script simply symlinks links the required project directories into your Wordpress installation. The issue with this is that there is a good chance the script won't work if the user who owns the wordpress plugins and themes directories is not the same user as the one running the script like `www-data`. In situations like this you have two choices.
- Change the owner of the themes and plugins directory to be the user running the script, run the script, and change the owner back to the original user.
- Or Manually symlink all the directories. This means the three sub-directories in the `_dev` directory point to the plugins directory, the `build/plugin` to the plugins directory, `build/theme` to the themes directory.
- Node.js must be installed on your machine and the NODE_PATH environmental variable must be set to the location of the node.js executable.

## SSR Notes & Caveats
### public/functions.php
Context data is defined in a singleton pattern. Also, in order for ApolloGraphQL to work server side on the same machine as WordPress `127.0.0.1` has to be used instead of `localhost`. Otherwise, the an **ECONNREFUSED** error is thrown.
```
/**
 * @var app_context stores context for request
 */
$app_context = null;

...

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
			'AJAX_URL'						=> admin_url( 'admin-ajax.php' ),
		];
	}

	return array_merge(
		$app_context,
		[
			'ENDPOINT' => ( $server ? 'http://127.0.0.1/' : home_url( '/' ) ) . apply_filters( 'graphql_endpoint', 'graphql' ),
		]
	);
}
```

Client-side script is chunked must be loaded in order like so. Note the `wp_localize_script` call as well use to past context data client-side.
```
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
```

### public/index.php
Server-side rendering is executed here. The `$nodePath` must be a valid path to the Node.js executable. The V8Js is viable alternative, but it requires an alternative setup. I suggest reading Sebastian De Deyne's [article](https://sebastiandedeyne.com/server-side-rendering-javascript-from-php/) learn more about it.
```
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
```

## WPGraphQL Component Notes & Caveats
WPGraphQL-Composer is a component library relied on heavily in the root React application as see below.
```
  ...
import Navbar from './nav-menu';
import Footer from './footer';
import Content from './content';
  ...
const Main = styled.main`
  position: relative;
  padding: 0;
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
`;

export default () => (
  <Fragment>
    <Navbar location="MAIN" /> // MAIN is the MenuLocationEnum value for the `main` menu created in public/functions.php 
    <Main> // Wrapper styled-component
      <Content /> // The real main component don't let the name confuse you. I'm sorry. I suck at names XD.
    </Main>
    <Footer />
  </Fragment>
);
```

The documentation is [here](https://github.com/kidunot89/wp-graphql-composer). This library's purpose is to provide reusable logic for creating React-Apollo components served data from WPGraphQL servers. The components are all customizable in layers using the provided compose functions. The following are noteworthy comments about the components used. 

### Main component ~ src/content/index.jsx
The `Main` component is the routing component. The `view` component defined in the `compose` function is wrapper in several HOCs, *Try finding the compoent in React Devtools to see what I mean* and all necessary props. It should always be **stateless**. The `Routes` prop is a routes component. If not overwritten, the default Routes prop passed mimics the **WordPress** routing setup behind the **WPGraphQL** server by writing the permalink settings. There are a few bugs, but it works for the most part. The `archive`, `page`, and `post` props are components used in the routes corresponding with their name.
```
import { main } from 'wp-graphql-composer';
  ...
const components = { archive, page, post };

const view = ({ Routes }) => (
  <Routes {...components} /> 
);

export default main.compose({ view });
```

### Post component ~ src/content/post.jsx
The `Post` component renders WP Post. It should be pretty self-explanatory. Also note `content`. Its `post_content` in the WP Database and stored as `HTML` string. Here it is parse and converted to React components using `react-html-parser`. It can be customized to parse components in different ways. See documentation [here](https://github.com/wrakky/react-html-parser).
```
  ...
import ReactHtmlParser from 'react-html-parser';
  ...

const view = ({ postId, title, content, className, style }) => (
  <Section id={`post-${postId}`} className={className} style={ style }>
    <h2>{title}</h2>
    <div className="entry-content">
      {ReactHtmlParser(content)}
    </div>
  </Section>
);

export default post.compose({ view });
```

### Menu component ~ src/nav-menu/index.jsx
import MenuItem from './menu-item';

The `Menu` component render a WP Menu. There is some noise in this component, but the takeaway is the `map` call. `MenuItem` can be a **stateless** component that renders a `link`, but here I've used another composed `WPGraphQL` component `MenuItem`. This component queries for any child `items` of that menu item and can render them too *It doesn't here though*.
```
const view = ({ slug, items }) => {
  const [menuOpen, toggleMenu] = useState(false);
  const barRef = useRef(null);

  const onClick = () => toggleMenu(false);
  return (
    <Fragment>
      <Waypoint id={`menu-${slug}`} ref={barRef} as={PosedNavbar} className="nav" menuOpen={menuOpen}>
        <Logo fromLeft className="logo" text />
        <Hamburger onClick={() => toggleMenu(!menuOpen)} visible={menuOpen} />
        <PosedMenu pose={menuOpen ? 'enter' : 'exit'}>
          { map(
            items,
            ({ id, ...rest }) => <MenuItem key={id} id={id} {...rest} onClick={onClick} />,
          )}
        </PosedMenu>
      </Waypoint>
      <Overlay className="overlay" menuOpen={menuOpen} />
    </Fragment>
  );
};


export default menu.compose({
  view,
  whileLoading: { view: () => null },
  forError: { view: () => null },
});
```

## Comments
I made this as more as showcase of possibilities of using a WPGraphQL server with WP theme functionality, instead of a simple How to use WPGraphQL client-side. I also skipped out on prop-typing *Note my eslint suppression littered across the code* because well I thought it would just add to the noise of `react-pose` and `styled-components` code and this is meant to be an example. Periodical, I may comeback and improve upon the styling, transitions, and WP theme code.