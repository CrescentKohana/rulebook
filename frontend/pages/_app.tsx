import "../styles/globals.css"
import type { AppProps } from "next/app"
import { createTheme, ThemeProvider } from "@material-ui/core/styles"

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
