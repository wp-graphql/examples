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
