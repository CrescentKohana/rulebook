import { createTheme, ThemeProvider } from "@material-ui/core/styles"
import type { AppProps } from "next/app"
import "../styles/globals.css"

const theme = createTheme({
  palette: { type: "dark" },
})

function RulebookApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default RulebookApp
