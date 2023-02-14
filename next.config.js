/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  reactStrictMode: true,
  env: {
    // SERVER_URL_GRAPHQL: 'http://192.168.202.52:1337/graphql',
    // SERVER_URL: 'http://192.168.202.52:1337'
    SERVER_URL_GRAPHQL: 'https://kobska-cpanel.knexel.com/graphql',
    SERVER_URL: 'https://kobska-cpanel.knexel.com'
  },
  images: {
    domains: ['192.168.202.52', 'kobska-cpanel.knexel.com']
  },
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}

module.exports = nextConfig
