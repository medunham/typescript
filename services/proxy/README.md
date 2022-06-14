# Overview

This service provides a developer HTTP(S) proxy that can be used when developing front-end applications and back-end services locally

# Background

The [http same origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) can cause problems when orchestrasting multiple front-end and back-end services. A common way to work with the same origin policy is to ensure that deployed versions of the applications and services use some kind of proxy that resolves to the same domain (i.e. `https://api.domain.com` and `https://www.domain.com`). It is also common for a proxy to reverse or re-target the request url so micro services can share the same domain andbase path with different sub-paths specific to the function of the service (i.e. `https://api.domain.com/api/auth` and `https://api.domain.com/api/profile`)

## Emulating load balancers

While developing locally, a front-end application or back-end service usually listens on local end-points with different origins as well (i.e. `http://localhost:3000` and `http://localhost:4000`). A developer can attempt to emulate the deployed solution archtiecture, by, for example, running a docker container with a similar nginx configuration as the deployed application.

Unfortunately, emulating the deployed solution can get very difficult if the proxying is done by a Cloud Service Load Balancer, or API Gateway type of software that is hard for a developer to run locally. Even when the software can be run locally, the setup of a docker container with port mapping and logging can be pretty involed.

## Client framework developer proxies

Another option developers can use are the built-in developer proxies provided by front-end frameworks like `angular` or `react`, which is usually some flavor / version of the [webpack developer proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy). In large mono-repos, there might be multiple front-end applications that need to work against backend-service which runs into the problem of two front-end applications that each run on different local ports but need to talk to backend services that are shared across the services (i.e. auth).

## External and deployed services

A developer might also need to proxy request to third party services when developing locally (i.e. https://api.weather.gov/) or proxy to a deployed environment so they are running a mix of local services and deployed services.

## SSL termination

Front-end applications may also demand SSL support for certain browser features to work properly. A common way to handle this is to have the edge gateway (i.e. developer proxy) terminate the SSL connection and proxy the request behind the scenes using a different SSL connection or just using plain HTTP (depending on the security of the underlying network)

## CORS

Another potential solutions is [cross-origin-resource-sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), but, often times, the indivdual services or proxies need to register which applications are allowed to cross communicate and the configuration can get complicated quite quickly.

Many teams avoid CORS when they can as it is simpler to deploy services behind a common origin and only use CORS when a client needs to talk to a third party services. Even when having to call third party services, many teams use the [back-end for front-end pattern](https://blog.bitsrc.io/bff-pattern-backend-for-frontend-an-introduction-e4fa965128bf).

# Dedicated developer proxy

A good compromise between trying to emulate a deployed environment (which can be involved and have licesning costs) and client specific frameworks is to provide a simple local developer proxy that supports reverse proxying for situations that need it (i.e. path re-writing) and external targeting (i.e. third party API's) as well a SSL termination.

This package creates a local developer proxy with a mimimal usage of the [express framework](https://github.com/expressjs/express) and the well used [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

# Configuration

The who proxy is implemented in `src/index.ts` and uses simple configuration directives to redirect calls from `http://localhost:[PORT]/[PATH]` to a given local or remote service. For more information on how to support different use cases, check out the `http-proxy-middleware` [usage](https://github.com/chimurai/http-proxy-middleware#basic-usage) and [options](https://github.com/chimurai/http-proxy-middleware#options) documenation

# Running locally

## In development mode

The proxy can be started for local development with the command `yarn start:dev` 

## In productio mode

The proxy needs to be built with `yarn build` which will create output in the `dist` folder and can be started with `yarn start`
