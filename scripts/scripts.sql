-- 1. Create or modify the users table with the role column
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'patient' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. In case the table already exists but is missing the role column
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'patient' NOT NULL;

-- 3. Create the chat_history table
CREATE TABLE IF NOT EXISTS chat_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  role VARCHAR(50) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- 4. Update any existing users to have the patient role
UPDATE users
SET role = 'patient'
WHERE role IS NULL OR role = '';

-- 5. Create test users (optional)
-- Create a test doctor user
INSERT INTO users (
  id, 
  name, 
  email, 
  password, 
  role, 
  created_at, 
  updated_at
) 
VALUES (
  '11111111-1111-1111-1111-111111111111', -- Replace with a generated UUID if needed
  'Test Doctor',
  'doctor@example.com',
  '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', -- Replace with your bcrypt hash
  'doctor',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING;

-- Create a test patient user
INSERT INTO users (
  id, 
  name, 
  email, 
  password, 
  role, 
  created_at, 
  updated_at
) 
VALUES (
  '22222222-2222-2222-2222-222222222222', -- Replace with a generated UUID if needed
  'Test Patient',
  'patient@example.com',
  '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', -- Replace with your bcrypt hash
  'patient',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING;