export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT),
    POSTGRES_DB: process.env.POSTGRES_DB,
    PGADMIN_DEFAULT_EMAIL: process.env.PGADMIN_DEFAULT_EMAIL,
    PGADMIN_DEFAULT_PASSWORD: process.env.PGADMIN_DEFAULT_PASSWORD,
  },
});
