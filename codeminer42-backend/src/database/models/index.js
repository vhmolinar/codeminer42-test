/* istanbul ignore file */
import { Sequelize } from 'sequelize';
import { DB_PORT, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } from '@/utils';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  logging: console.log,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD
});
