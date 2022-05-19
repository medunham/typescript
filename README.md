# Overview

This repository contains personal public typescript code and is intended for creating interesting examples, or demonstrating coding proficiency

# Repository Structure

This project is a [Monorepo](https://en.wikipedia.org/wiki/Monorepo) using [Yarn](https://yarnpkg.com/)

The repository folders are grouped by the type of artifact they generate:

| Folder | Artifact            |
| ------ | ------------------- |
| libs   | Re-usable libraries |
| katas  | Coding exercises    |

# Project / Package Structure

To help with consistency, each package is organized more or less with the same folder structure:

| Folder | Purpose                                    |
| ------ | ------------------------------------------ |
| src    | Typescript source code and jest unit tests |
| test   | Integration tests and text fixture data    |

**Note:** There isn't any one standard NodeJS folder structure as the eco-system frameworks tend to define their own structures (i.e. `app` versus `lib`, or `lib` versus `src`). Where possible, the above folders are used but may change based on the demands of a framework like `react`, `vue`, or `angular`

# Node

[NodeJS is released](https://nodejs.org/en/about/releases/) with different types of stability (i.e. `Current`, `Active`, and `Maintenance` across multiple versions to prevent breaking changes from impacting existing code.

Projects that take advantage of, or depend on, specific [JavaScript language features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources) need to have a simple way of overridding the node version being used when compling the code.

A simple way to achieve this is to use tools like [nodenv](https://github.com/nodenv/nodenv) or [nvm](https://github.com/nvm-sh/nvm)

The root folder contains a default [.nvmrc file](https://github.com/nvm-sh/nvm#nvmrc) which can be used by either `nvm` or `nodenv` to set the version of `node` to use.

**Note:** global node packages installed via `npm install -g` will use the directory configured for `nvm` or `nodenv` instead of the standard location of node (depending on how it was installed)

# Yarn

This package uses yarn workspaces configured for traditional node package linking, for more information see the [yarn migration documentation](https://yarnpkg.com/getting-started/migration)

The project was setup as follows:

```
npm install -g yarn
yarn set version stable
```

The following lines were added to the `.yarnrc.yml` file:

```yaml
nodeLinker: node-modules
```

# Workspaces

This project uses the [yarn workspaces](https://yarnpkg.com/features/workspaces) plugin to manage the different package and version dependencies between projects.

To enhance build-time behavior, the plugin [yarn-workspace-tools](https://yarnpkg.com/api/modules/plugin_workspace_tools.html) has been added to the repository with the command:

```
yarn plugin import workspace-tools
```

`yarn [command]` from the root of the repository will use the `foreach` command from yarn workspaces plugin to run a yarn command on each package in all workspaces in dependency order:

| Command  | Purpose                                      |
| -------- | -------------------------------------------- |
| build    | build projects                               |
| coverage | run jest tests with the coverage option      |
| clean    | clean jest test cache and build dist folders |
| format   | format code with prettier                    |
| lint     | lint code with eslint                        |
| test     | run jest tests                               |

A package can opt not to provide an implementation for a specific command, in wich case it will be skipped when iterating over all the workspace packages.

**Note:** the `.gitignore` file adds the following lines to exclude the yarn cache (and any other local development artifacts) from the `.yarn` folder. `yarn` supports checking in those files for consistency, but this is an opinionated decision to ensure that build pipelines will always work with code pulled from a signed source:

```
.yarn/*
!.yarn/patches
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/versions
```

# Prettier

The [prettier](https://prettier.io/) package is used to format typescript, markdown, and html files included in the repostiory and can be run against the repository with the command `yarn format`

The [.prettierc](.prettierrc) configuration file contains the following overrides:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 120
}
```

**Note:** these are opinionated options that I find helpful when developing with typescript and with a wide screen monitor

In order for packages to take advantage of the `prettier` formatting, they need to add the following `devDependencies`:

```json
{
  "prettier": "^2.2.1"
}
```

ESLint

The [eslint](https://eslint.org/) package is used to [lint](<https://en.wikipedia.org/wiki/Lint_(software)>) the javascript looking for common mistakes and will return a non-zero value if any of the

The root [eslintrc.js](.eslintrc.js) configuration file adds plugins to support typescript and to also prevent formatting conflicts between `prettier` and `eslint`. It also adds the following custom rules:

```json
{
  "rules": {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
}
```

In order to use `eslint` with `typescript`, each package needs to include the following `devDependencies`:

```json
{
  "eslint": "^6.8.0",
  "eslint-config-prettier": "^6.10.0",
  "eslint-plugin-import": "^2.20.1"
}
```

# Commits

This project uses the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) standard with the following scopes:

| Scope      | Description                                                    |
| ---------- | -------------------------------------------------------------- |
| repository | applies to the whole repository (i.e. usually the root folder) |
| [package]  | name of the package changes apply to (i.e. `common`)           |

An example of the initial repository check in might look like:

```
git add .
git commit -m "chore(repository): initial commit"
```

Note: this repository doesn't currently use packages like [husku](https://www.conventionalcommits.org/en/v1.0.0/) to wrap [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) to enforce style, linting, or commit message format, but this could easily be added.
