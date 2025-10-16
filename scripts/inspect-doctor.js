// scripts/inspect-doctor.js
// Script to inspect doctor database state directly

const { Client } = require('pg');
require('dotenv').config();

async function inspectDoctor() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Find the doctor by email
    const email = 'testdoctor@gmail.com';
    console.log(`🔍 Searching for doctor: ${email}\n`);

    // Query user
    const userResult = await client.query(
      'SELECT id, name, email, role, created_at FROM randevu.users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      console.log('❌ User not found in database');
      await client.end();
      return;
    }

    const user = userResult.rows[0];
    console.log('📋 USER INFORMATION:');
    console.log('-------------------');
    console.log(`ID:         ${user.id}`);
    console.log(`Name:       ${user.name}`);
    console.log(`Email:      ${user.email}`);
    console.log(`Role:       ${user.role}`);
    console.log(`Created:    ${user.created_at}`);
    console.log();

    if (user.role !== 'doctor') {
      console.log('⚠️  User is not a doctor');
      await client.end();
      return;
    }

    // Query doctor profile
    const profileResult = await client.query(
      'SELECT * FROM randevu.doctor_profiles WHERE user_id = $1',
      [user.id]
    );

    if (profileResult.rows.length === 0) {
      console.log('❌ NO DOCTOR PROFILE FOUND');
      console.log('   The doctor has not completed their profile yet.');
      await client.end();
      return;
    }

    const profile = profileResult.rows[0];
    console.log('👨‍⚕️  DOCTOR PROFILE:');
    console.log('-------------------');
    console.log(`Profile ID:       ${profile.id}`);
    console.log(`Specialization:   ${profile.specialization}`);
    console.log(`License Number:   ${profile.license_number || 'N/A'}`);
    console.log(`City:             ${profile.city || 'N/A'}`);
    console.log(`Clinic Name:      ${profile.clinic_name || 'N/A'}`);
    console.log(`Experience:       ${profile.experience_years || 'N/A'} years`);
    console.log(`Consultation Fee: $${profile.consultation_fee || 'N/A'}`);
    console.log();
    console.log(`⭐ IS_VERIFIED:    ${profile.is_verified} ${profile.is_verified ? '✅' : '❌'}`);
    console.log(`Rating:           ${profile.rating}`);
    console.log(`Total Reviews:    ${profile.total_reviews}`);
    console.log(`Created:          ${profile.created_at}`);
    console.log(`Updated:          ${profile.updated_at}`);
    console.log();

    // Diagnosis
    console.log('🔬 DIAGNOSIS:');
    console.log('-------------------');
    console.log(`✅ User exists:                    YES`);
    console.log(`✅ User is doctor:                 YES`);
    console.log(`✅ Profile exists:                 YES`);
    console.log(`${profile.is_verified ? '✅' : '❌'} Profile is verified:            ${profile.is_verified ? 'YES' : 'NO'}`);
    console.log();

    if (profile.is_verified) {
      console.log('✅ Should appear in /doctors list:  YES');
      console.log('✅ Should be accessible at /doctors/[id]: YES');
      console.log();
      console.log(`🔗 Profile URL: /doctors/${user.id}`);
    } else {
      console.log('❌ Should appear in /doctors list:  NO (not verified)');
      console.log('❌ Should be accessible at /doctors/[id]: NO (not verified)');
      console.log();
      console.log('💡 ACTION NEEDED:');
      console.log('   Admin needs to verify this doctor via /admin/doctors');
      console.log('   Or run: UPDATE randevu.doctor_profiles SET is_verified = true WHERE user_id = \'' + user.id + '\';');
    }

    await client.end();
  } catch (error) {
    console.error('❌ Error:', error);
    await client.end();
    process.exit(1);
  }
}

inspectDoctor();
