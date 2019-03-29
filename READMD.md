# MDU

A move-in ready monorepo.

## Installation

The only prerequisite is Yarn. Once you have that, run `yarn` to install dependencies, and `yarn pecanre.com` to run the pecanre.com dev server on port 3000.

## MDU

MDU leverages Yarn Workspaces to allow for simple, co-located packages. This pays off the most when you are building shared packages.

## Tenants

The turnkey setup for a tenant includes the following features:

* Next.js
* Axios
* Constate
* Tailwind
* Debug mode

## Super

Super is a special tenant that will allow for QA and administrative action. This is future facing, but I imagine it being the place where we could do e2e test running with image/video capture, shortcuts for creating listings/markets/offers, and so on.