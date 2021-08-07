import { createTheme, ThemeProvider } from "@material-ui/core/styles"
import type { AppProps } from "next/app"
import "../styles/globals.css"

const theme = createTheme({
  palette: { type: "dark" },
})

/**
 * Main app.
 */
function RulebookApp({ Component, pageProps }: AppProps): JSX.Element {
  // On a page load Next.js tries to:
  // pre-render the page (server-side) -> send it to the browser -> re-hydrate it in the browser.
  // Re-hydration: the page is re-rendered again in the browser and compared against to the server rendered version.
  // If they disagree, React issues a non-critical warning. Suppressing it with suppressHydrationWarning.
  // This happens because the application is using React router instead of the one from Next.js (see README).
  //
  // Also the undefined check prevents Next.js from rendering stuff that doesn't exist.
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : (
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      )}
    </div>
  )
}

export default RulebookApp
