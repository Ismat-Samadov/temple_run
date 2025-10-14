// Fix all user passwords
require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

async function fixPasswords() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('🔐 Updating all user passwords to: admin123\n');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('admin123', salt);

    // Update all users
    const result = await pool.query(
      'UPDATE randevu.users SET password = $1 RETURNING email',
      [hash]
    );

    console.log('✅ Updated passwords for:');
    result.rows.forEach(row => console.log('   -', row.email));

    console.log('\n📋 All users can now login with password: admin123');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

fixPasswords();
