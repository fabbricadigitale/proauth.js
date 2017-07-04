[![Build Status](https://img.shields.io/travis/fabbricadigitale/proauth.js.svg?style=flat-square)](https://travis-ci.org/fabbricadigitale/proauth.js)
[![Code Coverage](https://img.shields.io/codecov/c/github/fabbricadigitale/proauth.js.svg?style=flat-square)](https://codecov.io/gh/fabbricadigitale/proauth.js)

proauth.js
==========

> Automagically attach OAuth2's tokens to HTTP requests.

**proauth.js** is an OAuth 2.0 client with session management functionality and ability to attach the `Authorization` header to HTTP requests made by the browser.
Basically, when *proauth.js* is used alongside your app, it stores OAuth's tokens then handles any *managed URL*s
(ie. endpoints that require authentication, that you can specify within settings).

Any request to a *managed URL* (ie. an ajax to your authenticated API endpoint) will be intercepted in a seamless way.

For each HTTP request to a *managed URL*, once tokens are obtained and stored, *proauth.js* will:
- Attach the `Authorization` header containing the current access token
- Refresh the token when got a `401` response and retry to fetch the request with the new token

So, you don't have to care anymore about handling OAuth.

[![Build Status](https://saucelabs.com/browser-matrix/proauth.svg)](https://saucelabs.com/u/proauth)

## Install

To install this library, you can simply run the following command:

`npm install proauth.js`

Easy peasy!

## Usage

Just include the following snippet within `<head>`:
```html
<script>
  proauth = {
    // Put your settings here!
  }
</script>
<script src="lib/default.es2015.js"></script>
```

To start a new session you have just to make an API call to the configured oauth endpoint or you can use the following commodity:
```js
proauth.client.login(<username>, <password>)
```
> Return a promise fulfilled when the response is obtained

If authentication is successful, tokens are stored within the `localStorage` and used for subsequent requests to *managed URLs*.

To end the session you can use:
```js
proauth.client.clearSession()
```
or you can clear the `localStorage` by yourself.


### Configuration

You can configure *proauth.js* changing properties of the global `proauth` variable, before loading the library.

For example:
```js
proauth = {
  swSrc: "/service-worker.js",
  swOptions: {},
  oauthUrl: "/oauth",
  oauthClientId: "proauth",
  sessionStorage: "localStorage",
  namespace: "",
  managedUrls: [
      "/"
  ]
}
```
> User settings must be set proior to load the library


The properties you can customize are:
* `swSrc`: path to the service worker that will be registered when `default` package is loaded by the browser. Set it to a falsey value to avoid the auto-registration of service worker. (default: **"/service-worker.js"**)
* `swOptions`: object that will be passed as 2nd parameter to [ServiceWorkerContainer.register()](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register). Note that this setting has effect only if `swSrc` is a valid service worker URL. (default: **{}**)
* `oauthUrl`: URL of the OAuth service that will be used to negotiate tokens. (default: **"/oauth"**)
* `authClientId`: OAuth client that will be used during negotiation of tokens. (default: **"proauth"**)
* `sessionStorage`: where to store tokens and session informations. At the moment, only `localStorage` is supported. (default: **"localStorage"**)
* `namespace`: namespace that will be used to distinguish between sessions. (default: **document.origin && document.origin !== "null" ? document.origin : ""**)
* `managedUrls`: array of base URLs where to attach the *Authorization* header. (default: **["/"]**)


## How it works

This library implements a Client-Service model (both on browser side), also defining its own communication protocol.
The Client will communicate with the Service using the *postMessage* technique.
It is exposing a very thin API that allows you to set the configuration and perform basic tasks (ie. clearing the session).
Instead, the Service will perform the real job by handling all HTTP requests.
The more powerful way to accomplish this goal is to implement it within a *serviceWorker* that allows to intercept the requests, furthermore one Service can handle multiple Client instances that are sharing the same origin (ie. when using your app in multiple tabs concurrently).

### Legacy mode

When the *ServiceWorker* is not available (ie. the browser lacks support for it) the *legacy package* will imitate the Service behavior. This is done by hooking the *XHR* and *fetch* components of the browser in order to intercept HTTP requests.
Even if this approach has some caveats (of course it's not ideal) it should work without issues with the majority of 3rd-party libraries because all standardized interfaces are strongly respected, also it has no issue when polyfills are needed.

### Packages

This library provides the following packages:

- [src/client.js](./src/client.js) is imported by `legacy` and `default`. You should not import this package directly, unless you need to make a custom bundle of *proauth.js* that may be usefull if you want build it within your app.
- [src/legacy.js](./src/legacy.js) is required when a browser has no *seviceWorker* support. It loads stuff to work in *legacy mode* and bootstraps the `client`.
- [src/default.js](./src/default.js) is required for the normal operational mode. It can register the `service-worker` and when ready bootstraps the `client`.
- [src/service-worker.js](./src/service-worker.js) is required for the normal operatinal mode and is used in the *serviceWorker* context. You can use it directly or can include it in your own *serviceWorker* distribution.

## Compatibility

### Default (ES6)

* Chrome >= 45
* Firefox >= 51

### Legacy (ES5)

* Chrome >= 45
* Firefox >= 47

## Testing

### Requirements

* **Node.js** >= 4
* **Yarn** >= 0.21

### First setup

* `yarn install`
* `cp saucelabs.config.local.json.dist saucelabs.config.local.json` and customize it

### Run

Simply execute `npm test`.

---

## Demo

To try the code, open the **demo.html** file in a browser and paste the following code in the console:

```
proauth.client.login("username", "password").then(r => console.log('Response', r), r => console.log('Error', r))

fetch('/user/me').then(function(response) {
  console.log(response.type); // basic
  console.log(response.json());
})
```

> Assuming that on the same host an OAuth2.0 authorization endpoint is available on `/oauth` and `/user/me` returns some data

---
