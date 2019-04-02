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

### VSCode settings and extension suggestions

If we're all using VSCode as our IDE, this is a great way to minimize side effects when working on MDU code.

### Yarn Workspaces

The biggest advantage offered by Yarn Workspaces is when you're doing co-development. TK TK TK

### Zeit Now Support

I personally prefer Now over Netlify. The tools that they're building are more targeted at engineers, whereas Netlify (which is good!) seems to be more for non-engineers. Now let's us have more of our devops configuration living in our code, and exposes some useful env variables in their build pipeline. This could probably all be rebuilt focusing on netlify.toml instead of now.json but I would like to make the case.

## Tenants

The turnkey setup for a tenant includes the following features:

* [Axios](#-axios)
* [Constate](#-constate)
* [Next.js](#-next.js)
* [TailwindCSS](#-tailwindcss)
* [Webpack Configuration](#-webpack-configuration)

### Axios

### Constate

### Next.js

### TailwindCSS

### Webpack Configuration

## Shared

## Coming Soon

* [Debug Mode](#-debug-mode)
* [GitHub Actions](#-github-actions)
* [Super](#-super)

### Debug Mode

### GitHub Actions

### Super