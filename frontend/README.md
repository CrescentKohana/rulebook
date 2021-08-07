# Frontend

A single page app (SPA) made with Next.js which utilizes [server side rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) (SSR).

As it's in the the nature of the site to have the whole rulebook (chapters) to be available at all times **without ever adding any new data**, only **replacing the whole data set** on user request, server side rendering (SSR) works very well. There's no need for static site generation (SSG) and incremental static regeneration (ISG) which in turn would work well in applications such as blogs where new articles could be added at any time.

The app is also using React router instead of the one from Next.js for the reasons explained [here](https://colinhacks.com/essays/building-a-spa-with-nextjs):

> Next.js is not as flexible as React Router! React Router lets you nest routers hierarchically in a flexible way. It's easy for any "parent" router to share data with all of its "child" routes. This isn't possible with Next's built-in router!

## Usage

_The backend does not have to be up during the build of the frontend._

- `npm install` to install dependencies
- `npm run dev` for development.
- `npm run build` and `npm start` for production.

## Testing

**Information about End to End testing can be found in the main [README](../README.md)**

## Style

- `npm run prettier -- --write .` and `npm run lint` for style checks.

## Dependencies

- nodejs v14.17.1+ (LTS)
- npm (tested with 7.19.1+)
- [backend](../backend)
