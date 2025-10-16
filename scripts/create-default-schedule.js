// scripts/create-default-schedule.js
// Create default availability schedule for a doctor

const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

async function createDefaultSchedule() {
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

    console.log(`📅 Creating default schedule for: ${doctorName}`);
    console.log(`   Doctor ID: ${doctorId}\n`);

    // Check if schedule already exists
    const existingSchedule = await client.query(
      'SELECT COUNT(*) as count FROM randevu.availability_schedule WHERE doctor_id = $1',
      [doctorId]
    );

    if (parseInt(existingSchedule.rows[0].count) > 0) {
      console.log('⚠️  Schedule already exists. Deleting old schedule...');
      await client.query(
        'DELETE FROM randevu.availability_schedule WHERE doctor_id = $1',
        [doctorId]
      );
    }

    // Create default schedule: Monday-Friday, 9:00 AM - 5:00 PM
    // Note: Sunday is not included (closed day)
    const defaultSchedule = [
      { day: 1, dayName: 'Monday', start: '09:00:00', end: '17:00:00', available: true },
      { day: 2, dayName: 'Tuesday', start: '09:00:00', end: '17:00:00', available: true },
      { day: 3, dayName: 'Wednesday', start: '09:00:00', end: '17:00:00', available: true },
      { day: 4, dayName: 'Thursday', start: '09:00:00', end: '17:00:00', available: true },
      { day: 5, dayName: 'Friday', start: '09:00:00', end: '17:00:00', available: true },
      { day: 6, dayName: 'Saturday', start: '10:00:00', end: '14:00:00', available: true },
    ];

    console.log('📝 Creating schedule...\n');

    for (const schedule of defaultSchedule) {
      await client.query(
        `INSERT INTO randevu.availability_schedule
         (id, doctor_id, day_of_week, start_time, end_time, is_available)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [uuidv4(), doctorId, schedule.day, schedule.start, schedule.end, schedule.available]
      );

      const status = schedule.available ? '✅ Available' : '❌ Closed';
      const hours = schedule.available ? `${schedule.start} - ${schedule.end}` : 'Closed';
      console.log(`${schedule.dayName.padEnd(12)} ${status.padEnd(20)} ${hours}`);
    }

    console.log('\n✅ DEFAULT SCHEDULE CREATED SUCCESSFULLY!');
    console.log('\n📋 Schedule Summary:');
    console.log('   Monday - Friday:  9:00 AM - 5:00 PM');
    console.log('   Saturday:         10:00 AM - 2:00 PM');
    console.log('   Sunday:           Closed');
    console.log('\n💡 Patients can now book appointments!');
    console.log('   Doctor can customize schedule at /doctor/schedule');

    await client.end();
  } catch (error) {
    console.error('❌ Error:', error);
    await client.end();
    process.exit(1);
  }
}

createDefaultSchedule();
