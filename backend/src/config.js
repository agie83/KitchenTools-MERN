import packageJson from '../package.json';

const config = {
  port: process.env.PORT,
  db: {
    uri: process.env.DB_URI,
  },
  jwtSecret: process.env.JWT_SECRET,
};

export const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'KitchenTools API',
      version: packageJson.version,
    },
    servers: [{ url: `http://localhost:${config.port}` }],
  },
  apis: ['**/*.yaml'],
};

export default config;
