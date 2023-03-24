# Amorfati v2

Amorfati is fully customizable and component-based Hexo theme.

[한국어 ![](https://adg.mulder21c.io/img/icons/south-korea-flag-icon-16.png)](./docs/ko/README.md)

## Requirements

- Node v16.16.0+
- Hexo v6.3.0

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

Need to install [hexo-algoliasearch](https://github.com/LouisBarranqueiro/hexo-algoliasearch)
You can activate the search page just creating an empty page that uses the
search layout.

</details>

<details>
  <summary> <b>Easy customizable</b> </summary>

If you only modify the component's files, it is automatically reflected
everywhere that uses this component.

Many styles, such as color, text, and borders, are managed as CSS variables
in `source/css/modules/_root.scss` and SCSS variables in
`source/css/modules/_variables.scss`

Sourcemaps are provided for js and css in development mode for easy debugging.

</details>

## Installation

First, clone this repository

```bash
$ cd your/hexo/directory
$ git clone -b master --single-branch --depth=1 https://github.com/mulder21c/hexo-theme-amorfati-v2.git themes/amorfati
```

Then, install dependencies

```bash
$ cd themes/amorfati
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
hero: https://my.imag.es/hero.webm

# The path or ULR of the image to be displayed in post list.
# If not specified, hero is displayed instead.
thumbnail: https://my.imag.es/hero.thumb.webm

# post-specific style
# You can use scss or css, and use scss variables, mixins and functions
style:
```

##
