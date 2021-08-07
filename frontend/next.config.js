module.exports = {
  reactStrictMode: true,
  env: {
    RULEBOOK_DOMAIN: process.env.RULEBOOK_DOMAIN,
    RULEBOOK_API_URL: process.env.RULEBOOK_API_URL,
  },
  async rewrites() {
    return [
      // Rewrite everything else to use `pages/index`
      {
        source: "/:path*",
        destination: "/",
      },
    ]
  },
}
