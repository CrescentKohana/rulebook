import Document, { Head, Html, Main, NextScript } from "next/document"

/**
 * Custom document for the Html lang tag and Head meta tags.
 */
class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta name="charset" content="utf-8" />
          <meta name="description" content="Rulebook (Next.js / TypeScript)" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
