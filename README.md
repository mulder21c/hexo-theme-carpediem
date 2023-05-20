# Carpediem

Carpediem is fully customizable and component-based Hexo theme.

[한국어 ![](https://flagcdn.com/w20/kr.webp)](./docs/ko/README.md)

![Mock up](https://cdn.mulder21c.io/images/carpediem/screenshots/preview.jpg)

## Requirements

- Node v16.16.0+
- Hexo v6.3.0+

## Support Browsers

- modern browsers
- not support IE

## Features

<details>
  <summary> <b>Component-based</b> </summary>

Inspired by atomic design system, so made component-based using pug mixins.

You can find all the components used in this theme in `./components/`.
Each component consists of `pug`, `scss` and optionally `js` for UI function
implementation.

By following the BEM CSS methodology, each component can completely avoid
cascading problems and maintain its own style.

</details>

<details>
  <summary> <b>More accessible</b> </summary>

Tried to meet as many items as possible in WCAG 2.1 Level AA.
Checked for compliance for WCAG using the Axe tool.

</details>

<details>
  <summary> <b>Auto toggle light/dark mode</b> </summary>

Support automatic light/dark mode based on system settings.
It is also possible to fix it in a certain mode.

</details>

<details>
  <summary> <b>SEO friendly</b> </summary>

- Support JSON-LD
- Support link relation types
- Support site verification meta element

</details>

<details>
  <summary> <b>Post-specific style</b> </summary>

Support post-specific style.
You can write style in SCSS and use predefined SCSS functions and mixins.

</details>

<details>
  <summary> <b>Comments</b> </summary>

Support various comments platforms.

- commento
- disqus
- giscus
- livere
- remark
- utterance

If you want to do not use comments only in certain posts, you can disable
comments in front-matter.

</details>

<details>
  <summary> <b>External links</b> </summary>

Support external links in navigation

</details>

<details>
  <summary> <b>Search</b> </summary>

Support algolia search

Need to install [hexo-algoliasearch](https://github.com/LouisBarranqueiro/hexo-algoliasearch).
You can activate the search page just creating an empty page that uses the
search layout.

</details>

<details>
  <summary> <b>Internationalization</b>  </summary>

Support i18n based on `languages` configuration.
Currently supported languages are

- English
- Korean

</details>

<details>
  <summary> <b>Easy customizable</b> </summary>

If you only modify the component's files, it is automatically reflected
everywhere that uses this component.

Many style properties, such as color, font, and borders, are managed as CSS
variables in `source/css/modules/_root.scss` and SCSS variables in
`source/css/modules/_variables.scss`

Sourcemaps are provided for js and css in development mode for easy debugging.

</details>

<details>
  <summary> <b>Syntax highlight</b> </summary>

  Support only Prism.js

</details>

<details>
  <summary> <b>footnotes</b> </summary>

  Support footnotes, need to install
  [hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it)
  and active markdown-it-footnote plugin
</details>

## Installation

First, clone this repository

```bash
$ cd your/hexo/directory
$ git clone -b master --single-branch --depth=1 https://github.com/mulder21c/hexo-theme-carpediem.git themes/carpediem
```

Then, install dependencies

```bash
$ cd themes/carpediem
$ npm install
```

## Front matter

The default settings can be found in the
[hexo document](https://hexo.io/docs/front-matter).

The following are extra entries beyond the basic ones that are all optional.

```yml
# post's subtitle
subtitle: This is example.

# post' description used in og:description and meta description
description: You can use this item to customize the og:description

# The path or URL of the image to be used as the hero
hero: https://my.imag.es/hero.webp

# The path or ULR of the image to be displayed in post list.
# If not specified, hero is displayed instead.
thumbnail: https://my.imag.es/hero.thumb.webp

# post-specific style
# You can code in SCSS or CSS and use provided (S)CSS variables, mixins and
# functions.
style:
```

## Customization

### Helpers

See [Helpers Document](./docs/en/script/helpers.md)

### Tags

See [Tags Document](./docs/en/script/tags.md)

### Components

See [Components Document](./docs/en/pug/index.md)

### Styles (SCSS)

For Details of mixins and functions, see
[Components Document](./docs/en/scss/document.md)

Below is a brief description of the SCSS file.

|   path    |     file name      | description                             |
| :-------: | :----------------: | :-------------------------------------- |
|           |    `index.css`     | entrypoint                              |
| `helpers` | `_functions.scss`  | SCSS functions                          |
| `helpers` |   `_mixins.scss`   | SCSS mixins                             |
| `modules` | `_animations.scss` | Declarations for CSS animation keyframe |
| `modules` |    `_base.scss`    | Default Stylesheet                      |
| `modules` |    `_root.scss`    | CSS variables at `:root`                |
| `modules` | `_typography.scss` | Declarations for Fonts                  |
| `modules` | `_variables.scss`  | Declarations for SCSS variables         |


## Screenshots

### mobile <i style="font-size: 0.75em;font-weight:normal">＜ 768px</i>

<details open>
  <summary>Main page</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/mobile-main.webp" width="320" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Menu - closed</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/mobile-menu.webp" width="320" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Menu - opened all</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/mobile-menu-open.webp" width="320" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Archive Page</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/mobile-archive.webp" width="320" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Search Page</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/mobile-search.webp" width="320" style="margin-top:16px;max-width:100%" >

</details>

### tablet <i style="font-size: 0.75em;font-weight:normal">＜ 1024px</i>

<details open>
  <summary>Main page</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/tablet-main.webp" width="720" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Menu - closed</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/tablet-menu.webp" width="720" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Menu - opened all</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/tablet-menu-open.webp" width="720" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Archive Page</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/tablet-archive.webp" width="720" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Search Page</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/tablet-search.webp" width="720" style="margin-top:16px;max-width:100%" >

</details>

### pc <i style="font-size: 0.75em;font-weight:normal">＜ 1280px</i>

<details open>
  <summary>Main page</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/pc-main.webp" width="1200" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Menu - closed</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/pc-menu.webp" width="1200" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Menu - opened all</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/pc-menu-open.webp" width="1200" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Archive Page</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/pc-archive.webp" width="1200" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Search Page</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/pc-search.webp" width="1200" style="margin-top:16px;max-width:100%" >

</details>

### larger <i style="font-size: 0.75em;font-weight:normal">≥ 1280px</i>

<details open>
  <summary>Main page</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/larger-main.webp" width="1336" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Menu - closed</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/larger-menu.webp" width="1336" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Menu - opened all</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/larger-menu-open.webp" width="1336" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Archive Page</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/larger-archive.webp" width="1336" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>Search Page</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/larger-search.webp" width="1336" style="margin-top:16px;max-width:100%" >

</details>
<details>
  <summary>scroll bar (all screen size)</summary>

  <img src="https://cdn.mulder21c.io/images/carpediem/screenshots/with-scroll.webp" width="1336" style="margin-top:16px;max-width:100%" >

</details>

## Feedback

You can submit a bug or feature suggestion at
[issue](https://github.com/mulder21c/hexo-theme-carpediem/issues/new/choose).