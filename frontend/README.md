# Frontend

Made with TypeScript + Next.js. Utilizes [static site generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) (SSG) and [incremental static regeneration](https://vercel.com/docs/next.js/incremental-static-regeneration) (ISR).

Navigation and every page (chapter) available during build-time are rendered beforehand by the server. In addition, rerendering occurs periodically afterwards. Any new chapters (not available during build-time) will be rendered by the server on the first request blocking the view for the duration of the render (talking about milliseconds here).

## Usage

The backend has to be up and running before trying to build the site!

- `npm install` to install dependencies
- `npm run dev` for development.
- `npm run build` and `npm start` for production.

## Testing

**Information about End to End testing can be found in the main [README](../README.md)**

## Style

- `npm run prettier -- --write .` and `npm run lint` for style checks.

## Something to note

The user has to reload the site manually after Replacing the rule data even with `Router.reload()` imported from `next/router`. I wasn't able to debug the cause in
reasonable time. When 'on-demand revalidation' is going be available for Next.js, this will be fixed:

- [github.com/vercel/next.js/discussions/11552#discussioncomment-2655](https://github.com/vercel/next.js/discussions/11552#discussioncomment-2655)
- [stackoverflow.com/questions/66995817/next-js-static-regeneration-on-demand](https://stackoverflow.com/questions/66995817/next-js-static-regeneration-on-demand)

### Dependencies

- nodejs v14.17.1+ (LTS)
- npm (tested with 7.19.1+)
- [backend](../backend)
