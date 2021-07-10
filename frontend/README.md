# Frontend

Made with TypeScript + Next.js. Utilizes server side rendering.

Navigation and every page (chapter) available during build-time are rendered beforehand by the server. In addition, rerendering occurs periodically afterwards. Any new chapters (not available during build-time) will be rendered by the server on the first request blocking the view for the duration of the render (talking about milliseconds here).

## Usage

The backend has to be up and running before trying to build the site!

- `npm install` to install dependencies
- `npm run dev` for development.
- `npm run build` and `npm start` for production.

### Dependencies

- nodejs v14.17.1+ (LTS)
- npm (tested with 7.19.1+)
- [backend](../backend)
