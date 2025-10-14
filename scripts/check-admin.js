// Check if admin user exists
require('dotenv').config();
const { Pool } = require('pg');

async function checkAdmin() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('🔍 Checking admin user...\n');

    const result = await pool.query(
      'SELECT id, name, email, role, created_at FROM randevu.users WHERE email = $1',
      ['admin@randevu.com']
    );

    if (result.rows.length === 0) {
      console.log('❌ Admin user NOT found in database!');
      console.log('Let me create it...\n');

      // Create admin user
      await pool.query(`
        INSERT INTO randevu.users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
      `, [
        'System Administrator',
        'admin@randevu.com',
        '$2a$10$XJ9Sdl4WgAwNFPD6kQ5QSu8h4mZxF1KNMrjuv.MAIm80TA5wrR7U6',
        'admin'
      ]);

      console.log('✅ Admin user created!');
    } else {
      console.log('✅ Admin user found:');
      console.log('   Name:', result.rows[0].name);
      console.log('   Email:', result.rows[0].email);
      console.log('   Role:', result.rows[0].role);
      console.log('   Created:', result.rows[0].created_at);
    }

    console.log('\n📋 All users in database:');
    const allUsers = await pool.query('SELECT name, email, role FROM randevu.users ORDER BY created_at');
    console.table(allUsers.rows);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkAdmin();
