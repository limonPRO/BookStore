import { knex } from 'knex';
import config from '../knexfile';

const environment = process.env.NODE_ENV || 'development';
const knexConfig  = config[environment];
const knexFile  = knex(knexConfig);

export default knexFile;