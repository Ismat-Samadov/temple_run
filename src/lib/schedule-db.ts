// src/lib/schedule-db.ts
import { query } from './db';
import { v4 as uuidv4 } from 'uuid';

/**
 * Create default availability schedule for a newly verified doctor
 * Monday-Friday: 9:00 AM - 5:00 PM
 * Saturday: 10:00 AM - 2:00 PM
 * Sunday: Closed (no entry)
 */
export async function createDefaultAvailability(doctorId: string): Promise<void> {
  // Check if schedule already exists
  const existing = await query(
    'SELECT COUNT(*) as count FROM randevu.availability_schedule WHERE doctor_id = $1',
    [doctorId]
  );

  if (parseInt(existing.rows[0].count) > 0) {
    // Schedule already exists, don't overwrite
    return;
  }

  // Create default schedule
  const defaultSchedule = [
    { day: 1, start: '09:00:00', end: '17:00:00' }, // Monday
    { day: 2, start: '09:00:00', end: '17:00:00' }, // Tuesday
    { day: 3, start: '09:00:00', end: '17:00:00' }, // Wednesday
    { day: 4, start: '09:00:00', end: '17:00:00' }, // Thursday
    { day: 5, start: '09:00:00', end: '17:00:00' }, // Friday
    { day: 6, start: '10:00:00', end: '14:00:00' }, // Saturday
    // Sunday is closed - no entry
  ];

  for (const schedule of defaultSchedule) {
    await query(
      `INSERT INTO randevu.availability_schedule
       (id, doctor_id, day_of_week, start_time, end_time, is_available)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [uuidv4(), doctorId, schedule.day, schedule.start, schedule.end, true]
    );
  }
}
