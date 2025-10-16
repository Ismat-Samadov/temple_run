// scripts/check-availability.js
// Check doctor availability schedule

const { Client } = require('pg');
require('dotenv').config();

async function checkAvailability() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    const email = 'testdoctor@gmail.com';

    // Get doctor user ID
    const userResult = await client.query(
      'SELECT id, name FROM randevu.users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      console.log('❌ Doctor not found');
      await client.end();
      return;
    }

    const doctorId = userResult.rows[0].id;
    const doctorName = userResult.rows[0].name;

    console.log(`🔍 Checking availability for: ${doctorName}`);
    console.log(`   Doctor ID: ${doctorId}\n`);

    // Check availability schedule
    const scheduleResult = await client.query(
      `SELECT * FROM randevu.availability_schedule
       WHERE doctor_id = $1
       ORDER BY day_of_week, start_time`,
      [doctorId]
    );

    console.log('📅 AVAILABILITY SCHEDULE:');
    console.log('-------------------------');

    if (scheduleResult.rows.length === 0) {
      console.log('❌ NO AVAILABILITY SCHEDULE FOUND!');
      console.log('\n💡 ISSUE IDENTIFIED:');
      console.log('   The doctor has NOT set up their availability schedule.');
      console.log('   This is why patients see "No available slots for this date".\n');
      console.log('📝 SOLUTION:');
      console.log('   1. Doctor needs to visit /doctor/schedule');
      console.log('   2. Set availability for each day of the week');
      console.log('   3. Define working hours (e.g., 09:00 - 17:00)');
      console.log('\n🔧 OR CREATE DEFAULT SCHEDULE:');
      console.log('   Run: node scripts/create-default-schedule.js');
    } else {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      scheduleResult.rows.forEach(row => {
        const dayName = days[row.day_of_week];
        const status = row.is_available ? '✅ Available' : '❌ Not Available';
        console.log(`${dayName.padEnd(10)} ${status.padEnd(20)} ${row.start_time} - ${row.end_time}`);
      });

      console.log('\n✅ Availability schedule is configured');
    }

    // Check existing appointments
    const appointmentsResult = await client.query(
      `SELECT COUNT(*) as count FROM randevu.appointments WHERE doctor_id = $1`,
      [doctorId]
    );

    console.log(`\n📊 Total appointments: ${appointmentsResult.rows[0].count}`);

    await client.end();
  } catch (error) {
    console.error('❌ Error:', error);
    await client.end();
    process.exit(1);
  }
}

checkAvailability();
