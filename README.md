# MDU

A move-in ready monorepo.

* [Installation](#-installation)
* [About](#-about)
* [MDU, the Repo](#-mdu-the-repo)
* [Tenants](#-tenants)
* [Shared](#-shared)
* [Coming Soon](#-coming-soon)

## Installation

The only prerequisite is Yarn. Once you have that, run `yarn` to install dependencies, and `yarn pecanre.com` to run the pecanre.com dev server on port 9000.

## About

This repo is kind of an extension of my engineering philosophies.

## MDU, the Repo

MDU offers the following features:

* [ESLint](#-eslint)
* [Prettier](#-prettier)
* [Stylelint](#-stylelint)
* [VSCode Settings and Extension Suggestions](#-vscode-settings-and-extension-suggestions)
* [Yarn Workspaces](#-yarn-workspaces)
* [Zeit Now Support](#-zeit-now-support)

### ESLint

By default, the ESLint is configured for Prettier and Hooks. My proposal would be that we block off an hour or so and go through popular ESLint configurations and decide as a team if we want to opt into them. Linting should exist as a means, not an ends.

### Prettier

A majority of the time, our linter errors are actually in the purview of Prettier. By using a .prettierrc and the Prettier VSCode plugin, we can be pretty confident that our code will get properly formatted.

### Stylelint

With Tailwind, our handwritten CSS will hopefully be kept to a minimum, but Stylelint will make sure that we have reasonable rules for writting CSS.

### VSCode Settings and Extension Suggestions

If we're all using VSCode as our IDE, this is a great way to minimize side effects when working on MDU code.

### Yarn Workspaces

The biggest advantage offered by Yarn Workspaces is when you're doing co-development. TK TK TK

### Zeit Now Support

I personally prefer Now over Netlify. The tools that they're building are more targeted at engineers, whereas Netlify (which is good!) seems to be more for non-engineers. Now let's us have more of our devops configuration living in our code, and exposes some useful env variables in their build pipeline. This could probably all be rebuilt focusing on netlify.toml instead of now.json but I would like to make the case.

## Tenants

The turnkey setup for a tenant includes the following features:

* [Axios](#-axios)
* [Constate](#-constate)
* [Hooks](#-hooks)
* [Next.js](#-next.js)
* [Persisted State](#-persisted-state)
* [PurgeCSS](#-purgecss)
* [TailwindCSS](#-tailwindcss)
* [Webpack Configuration](#-webpack-configuration)

### Axios

Modern browsers have a native Fetch API but it kinda sucks, tbh. It's not isomorphic (doesn't work server-side) and you always end up writing some kind of wrapper library for it anyway. The savings you get vs. using a well-considered, compatible library like Axios is not worth the savings.

### Constate

Redux is too complicated for most use cases. What you really just need something to hoist state and actions. Constate is a very light wrapper around useContext and useState.

### Hooks

Components are much easier when they're not class-based. Hooks!

### Next.js

Next is a React-based framework. Most of the things that you end up gluing together on your own come baked in here. It has a robust community and full-time paid developers. One of the biggest advantages it gives you is SSR, but even that is optional. It also does static rendering out of the box.

### Persisted State

### PurgeCSS

As a developer, you don't want to be handcuffed in your CSS development, but large style assets is one of the biggest roadblocks to performance gains. PurgeCSS solves for that by throwing out defined CSS that you don't need, making for very small production style assets.

### TailwindCSS

A utility class CSS library that makes for rapid, predictable design and limited side effects.

### Webpack Configuration

Next.js makes Webpack 4 configuraiton easy. No more ejecting or multiple files, just functional wrappers and when necessary configuration keys.

## Shared

## Coming Soon

* [Debug Mode](#-debug-mode)
* [GitHub Actions](#-github-actions)
* [Super](#-super)

### Debug Mode

### GitHub Actions

### Super