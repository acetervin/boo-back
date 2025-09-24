import { Pool } from '@neondatabase/serverless';
import 'dotenv/config';

async function testConnection() {
    console.log('Testing database connection...');
    console.log('Database URL:', process.env.DATABASE_URL);
    
    try {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const result = await pool.query('SELECT NOW()');
        console.log('Connection successful!', result.rows[0]);
        await pool.end();
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

testConnection();