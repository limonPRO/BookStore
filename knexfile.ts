import { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    // client: process.env.DB_CLIENT || 'pg',
    client: 'mysql',
    connection: {
      // host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // port: Number(process.env.DB_PORT),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      // tableName: 'knex_migrations',
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
  },
};

export default config;
