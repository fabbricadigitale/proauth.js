# DEV HOW-TO

## Requirements

* **Yarn** >= 0.21

## Install dependencies

Simply run `yarn install`

## Building

You can primarily generate two kind of builds:
* Build containing source maps for debugging purposes (ie., `BUILD_ENV=development`)
* Build for production use

The build generates distinct bundles and composable libraries.

The commands to build them are:

```
npm run dev
npm run lib
```

## Releasing

The process is the following:

1. Go on the **master** branch

2. Ensure all dependencies are in place

3. Start the **release process** executing

    `npm version patch -m "New: Version %s"`

4. The default git editor will be opened: edit the **CHANGELOG** where needed, then save
