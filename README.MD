# Kami

Kami aka Kamiyomi (lit: paper reading) is an open source self-hosted publication viewer heavily inspired by Tachiyomi but designed for cross-platform compatability.

## Basics

The viewer consists of three important and decoupled parts:

1. A server that uses publication source extensions to get data from publication websites
2. A client for browsing the data. This can be a mobile app, desktop app, or web app.
3. One or more extension registries for enabling source publication extensions. A default extension registry is maintained that hosts

The client in this repository is a responsive web-based application embeddable in electron apps and webviews. Publications are cached using indexeddb and service workers.

## Hosting

The server can be hosted in a cloud environment or on a local network. In most cases the easiest method of settting it up is to run the docker container.

In some situations you may want to run the server directly. Simply ensure you have node 14+ installed an then run the kami command using npx:

```
npx kami serve
```

By default all data will be stored in the directory that the command is run in, but you can change this and other setttings by passing in command line arguments.

```sh
npx kami serve --data-directory ./data \
  --registry kami:https://kami.to/registry \
  --extension kami:extension-from-registry  \
  --extension npm:extension-from-npm \
  --extension file:./local-extension
```

> Make sure you only use trusted registries.

## Clients

Kami officially only maintains a single client, though more clients may appear in the future from other developers.

The client is a visual interface for browsing publications, managing sources, interacting with the api, and syncing user data such as reading progress or favorites.

## Roadmap

At the moment Kamiyomi works best with one server and not more than a few users.

- [ ] User accounts/profiles so that kamiyomi can service multiple users at once.
  - This would mean only an admin can install sources, but souces won't have their own dependencies so this should be alright.
- [ ] Aggressive caching for publication sources
- [ ] Task queue for background data fetching, web scraping, and coordination in a distributed environment

# Contributing

This is a multi-package repo that uses lerna to hoist dependencies.

First clone the repository:

```sh
git clone kamiyomi
cd kamiyomi
```

Then run

```sh
npm install
```

You now need to npm install in the `kami-client` directory if you want to work on the `kami-client` as well.

This is because `kami-client` uses CRA which has different dependencies that can't be hoisted along with the other packages. Hoping to figure out how to fix this at some point.

```sh
cd packages/kami-client
npm install
npm run dev
```

## Extensions

For instructions on developing extensions, such as a Publication Source extension, see the packages/extensions folder.