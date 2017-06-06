proauth.js
==========

> Lightweight OAuth 2.0 client with automatic session handling.

Basically, when *proauth.js* is used alongside your app, it automatically stores OAuth's tokens
and handles any *managed URL*s (i.e. endpoints that require authentication, that you can specify within settings).

Any request made by the browser to a *managed URL* (i.e. an ajax to your authenticatated API endpoint) will be intercepted in a seamless way.

For each HTTP request to a *managed URL*, once tokens are obtained and stored, *proauth.js* will:
- Attach the `Authorization` header containing the current access token
- Refresh the token when got a `401` response and retry to fetch the request with the new token

So, you don't have to care anymore about handling OAuth.

## Install

TODO

## Usage

Just include the following snippet within `<head>`:
```html
<script>
  proauth = {
    // Put your settings here!
  }
</script>
<script src="lib/client.js"></script>
```

### Configuration

TODO

## How it works

TODO

### Architecture

This library implements a Client-Service model (both on browser side), also defining its own communication protocol.
The Client will communicate with the Service using the *postMessage* technique.
It is exposing a very thin API that allows you to set the configuration and perform basic tasks (i.e. clearing the session).
Instead, the Service will perform the real job by handling all HTTP requests.
The more powerful way to accomplish this goal is to implement it within a *serviceWorker* that allows to intercept the requests, furthermore one Service can handle multiple Client instances that are sharing the same origin (i.e. when using your app in multiple tabs concurrently).

#### Legacy mode

When the *ServiceWorker* is not available (i.e. the browser lacks support for it) then *proauth.js* will load the *legacy package* that will imitate the Service behavior. This is done by monkey patching the *XHR* and *fetch* components of the browser in order to hook HTTP requests.
Even this approach has some caveats (of course it's not ideal), BTW it should work without issues with the majority of 3rd-party libraries because all standardized interfaces are strongly respected, also it has no issue when polyfills are needed.

## Developers

### Requirements:
* **Node.js** LTS version (6.9+ at the moment of writing)

### First setup
* Clone this repo
* Install dependencies with following command:
```
yarn install
```

## Tests

### Requirements:
* **Go** 1.8+

### First setup
* `go get github.com/julienschmidt/httprouter`

### Run
* `npm run lib`
* `npm test`

---

### Building

You can primarily generate two kind of builds:
* Build containing source maps for debugging purposes (ie., `BUILD_ENV=development`)
* Build for production use

The build generates three distinct and composable libraries.

The commands to build them are:

```
npm run dev
npm run lib
```

### Releasing

The process is the following:

1. Go on the **master** branch

2. Ensure all dependencies are in place

3. Start the **release process** executing

    `npm version patch -m "New: Version %s"`

4. The default git editor will be opened. Modify the **CHANGELOG** if needed, then save

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
