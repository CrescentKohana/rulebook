# Frontend

Made with TypeScript + Next.js. Utilizes server side rendering. 

Every page (chapter) available during build-time and navigation is rendered beforehand by the server. In addition, everything is rerendered by the server periodically. Any new chapters (not available during build-time) will be rendered by the server on the first request blocking the view for the duration of the render (talking about milliseconds here).

## Usage

The backend has to be up and running before trying to build the site!

- `npm install` to install dependencies
- `npm run dev` for development.
- `npm run build` and `npm start` for production.

### Dependencies

- nodejs v14.16.0+ (LTS)
- npm latest (tested with 7.4.2)
