export default () => ({
  env: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.API_PORT ?? 4000),
  webUrl: process.env.WEB_URL ?? 'http://localhost:3000',
});
