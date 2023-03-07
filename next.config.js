/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_URL: process.env.API_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL,
    BASE_URL: process.env.BASE_URL,
    PORT: process.env.PORT,
    SHOPIFY_LINK_REDIRECT: process.env.SHOPIFY_LINK_REDIRECT,
    client_id: process.env.client_id,
  },
};
