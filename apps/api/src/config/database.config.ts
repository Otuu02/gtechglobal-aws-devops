export default () => ({
  url: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/gtechglobal_os',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
});
