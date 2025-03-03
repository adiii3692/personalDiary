//Imports
import createRequire from 'create-require';
const require = createRequire(import.meta.url)
const Pool = require('pg').Pool;
require('dotenv').config()

//Connection Strings
export const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl:{
        rejectUnauthorized: false
    }
});

//Function to initiate connection and verify its status
export const testConnection = async () => {
    try {
      const client = await pool.connect();
      console.log("Connected to PostgreSQL!");
      client.release();
    } catch (err) {
      console.error("Error connecting to the database:", err);
    }
  };