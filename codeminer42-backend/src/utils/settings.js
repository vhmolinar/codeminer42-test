/* istanbul ignore file */
import dotenv from 'dotenv';
dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
export { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT };
