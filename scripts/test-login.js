// Test admin login
require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

async function testLogin() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('🔍 Testing admin login...\n');

    // Get admin user
    const result = await pool.query(
      'SELECT id, email, password FROM randevu.users WHERE email = $1',
      ['admin@randevu.com']
    );

    if (result.rows.length === 0) {
      console.log('❌ Admin user not found!');
      return;
    }

    const user = result.rows[0];
    console.log('✅ Found admin user:');
    console.log('   ID:', user.id);
    console.log('   Email:', user.email);
    console.log('   Password Hash:', user.password.substring(0, 30) + '...');

    // Test password
    const testPassword = 'admin123';
    console.log('\n🔐 Testing password:', testPassword);

    const isValid = await bcrypt.compare(testPassword, user.password);

    if (isValid) {
      console.log('✅ Password matches!');
    } else {
      console.log('❌ Password does NOT match!');
      console.log('\nLet me create the correct hash...');

      const salt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(testPassword, salt);
      console.log('New hash:', newHash);

      // Update the password
      await pool.query(
        'UPDATE randevu.users SET password = $1 WHERE email = $2',
        [newHash, 'admin@randevu.com']
      );

      console.log('✅ Password updated in database!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

testLogin();
