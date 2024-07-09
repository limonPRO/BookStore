import knexFile from './db';

export async function checkDatabaseConnection() {
  try {
    console.log('Database is connected!');
    await knexFile.raw('SELECT 1+1 AS result');
  } catch (err:any) {
    console.error('Database connection failed:', err.message);
    throw err;
  }
}