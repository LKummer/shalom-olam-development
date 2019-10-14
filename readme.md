<p align="center">
    <img width=20% src="resources/sabres-logo.svg">
    <img width=80% src="resources/shalom-olam-dev-header.png">
</p>

# About

This is the development repository of the [Shalom Olam Hugo Theme](https://github.com/LKummer/shalom-olam-hugo-theme) project.

This repo includes everything needed to build the theme from the ground up.

# Usage

If you are looking to use the theme, you need the [hugo-theme](https://github.com/LKummer/shalom-olam-hugo-theme) repository.

This repository contains a style build, a JS bundle and a development blog.

## Building The Blog

Currently Hugo is not set up in the `docker-compose.yml` and you need to use a local copy of Hugo to build the development blog.

The development blog can be built with Hugo from the blog folder:

    cd blog
    hugo serve

## Building The JavaScript

The JavaScript for the theme is transpiled and bundled with Babel and Webpack. Build and watch scripts are set up as services in the project's `docker-compose.yml`.

You can run the build with the `package_build` service:

    docker-compose up package_build

Or you can watch for changes using the `package_dev` service:

    docker-compose up package_dev

Note the `package_dev` service generates a large bundle and only bundles generated with the `package_build` service should be used when using the theme.

## Linting The JavaScript

ESLint is set up in the `package_lint` service, and can be used for linting the sources of the JavaScript package:

    docker-compose up package_lint

## Building Fomantic

As the theme is entirely right to left, Fomantic-UI is set up to build just the required components in right to left mode.

It is set up in the `fomantic_build` service:

    docker-compose up fomantic_build

# License

This project is licensed under the GNU General Public License 3.0.

## Used Dependencies:

Thanks to the developers of all the dependencies of this project.

* [Fomantic-UI](https://github.com/fomantic/fomantic-ui/) - MIT.
    * [jQuery](https://github.com/jquery/jquery) - MIT.
* [Fuse.js](https://github.com/krisk/fuse/) - Apache 2.0.
* [Prism.js](https://github.com/PrismJS/prism/) - MIT.
* [Core-js](https://github.com/zloirock/core-js) - MIT.

## Used Tools:

Thanks to the developers of all the tools used in this project.

* [Docker](https://www.docker.com/).
* [ESLint](https://github.com/eslint/eslint) - MIT.
* [Webpack](https://github.com/webpack/webpack) - MIT.
* [Babel](https://github.com/babel/babel) - MIT.