// generate-password-hash.js
// Run with: node generate-password-hash.js

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

async function generatePasswordHash() {
  const password = 'password123';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  
  console.log('For use in SQL scripts:');
  console.log('Password:', password);
  console.log('Hashed Password:', hash);
  console.log('UUID for doctor:', uuidv4());
  console.log('UUID for patient:', uuidv4());
}

generatePasswordHash();