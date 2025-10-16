# Randevu Application - Comprehensive Testing Checklist

## Test Environment
- **Server**: http://localhost:3000
- **Status**: ✅ Running
- **Build**: ✅ No TypeScript errors (only minor linting warnings)

---

## 1. PATIENT PORTAL TESTING

### 1.1 Authentication & Registration
- [ ] **Sign Up**
  - Navigate to `/auth/signup`
  - Create new patient account with valid email
  - Verify email validation works
  - Verify password requirements
  - Check successful registration and redirect

- [ ] **Sign In**
  - Navigate to `/auth/signin`
  - Login with test account: `testpatient@gmail.com` / `password123`
  - Verify successful login and redirect to dashboard
  - Test "Remember me" functionality

- [ ] **Sign Out**
  - Click logout button
  - Verify session cleared
  - Verify redirect to home page

### 1.2 Patient Dashboard
- [ ] Navigate to `/dashboard`
- [ ] Verify dashboard statistics display
- [ ] Check upcoming appointments widget
- [ ] Verify quick actions buttons work
- [ ] Test responsive design on mobile view

### 1.3 Find Doctors
- [ ] Navigate to `/doctors`
- [ ] Verify doctors list displays verified doctors only
- [ ] **Search functionality**:
  - Search by doctor name
  - Search by specialization
  - Search by city
- [ ] **Filter functionality**:
  - Filter by specialization dropdown
  - Filter by city dropdown
  - Test combined filters
- [ ] **Sort functionality**:
  - Sort by rating
  - Sort by experience
  - Sort by consultation fee
- [ ] Verify doctor cards show: name, specialization, rating, city, fee
- [ ] Test pagination if many doctors exist

### 1.4 Doctor Profile View
- [ ] Click on a doctor from the list
- [ ] Navigate to `/doctors/[doctor-id]`
- [ ] Verify doctor information displays:
  - Name, photo, specialization
  - Biography, education, experience
  - Consultation fee, working hours
  - Average rating and reviews count
  - Contact information (phone, email)

### 1.5 Appointment Booking
- [ ] On doctor profile page, scroll to booking section
- [ ] **Date selection**:
  - Select date from calendar
  - Verify only future dates are selectable
  - Verify doctor's working days are highlighted
- [ ] **Time slot selection**:
  - Verify available time slots display for selected date
  - Verify unavailable/booked slots are disabled
  - Select an available time slot
- [ ] **Booking form**:
  - Enter appointment notes/reason
  - Submit booking form
  - Verify success message
  - Verify redirect to appointments page

### 1.6 My Appointments
- [ ] Navigate to `/appointments`
- [ ] Verify appointments list displays
- [ ] **Filter by status**:
  - All appointments
  - Upcoming
  - Completed
  - Cancelled
- [ ] **Filter by date range**
  - Test date range picker
- [ ] **Appointment actions**:
  - View appointment details
  - Cancel upcoming appointment (if allowed)
  - Verify cancellation confirmation dialog
- [ ] Verify each appointment shows:
  - Doctor name with link
  - Date and time
  - Status badge
  - Appointment notes

### 1.7 Patient Profile
- [ ] Navigate to `/profile`
- [ ] Verify patient information displays
- [ ] **Edit profile**:
  - Update name
  - Update phone number
  - Update address
  - Update date of birth
  - Save changes
  - Verify success message
- [ ] Test profile photo upload (if implemented)

---

## 2. DOCTOR PORTAL TESTING

### 2.1 Doctor Registration & Setup
- [ ] **Sign Up as Doctor**
  - Navigate to `/auth/signup`
  - Select "Doctor" role
  - Complete registration
  - Verify email: `testdoctor2@gmail.com` / `password123`

- [ ] **Profile Setup** (New Doctor)
  - After login, verify redirect to `/doctor/profile-setup`
  - **Complete professional profile**:
    - Specialization
    - Medical license number
    - Years of experience
    - Education details
    - Biography
    - Consultation fee
    - Hospital/clinic name
    - Hospital address
    - City
    - Phone number
    - Working hours
  - Submit profile
  - Verify success message

### 2.2 Doctor Verification Status
- [ ] Navigate to `/profile` as unverified doctor
- [ ] Verify **PENDING VERIFICATION** banner shows:
  - Yellow/blue warning banner
  - Message: "Profile pending admin verification"
  - Note: Cannot receive appointments yet
- [ ] Verify profile is NOT visible in public doctors list

### 2.3 Doctor Dashboard
- [ ] Login as verified doctor: `testdoctor@gmail.com`
- [ ] Navigate to `/doctor/dashboard`
- [ ] **Verify statistics display**:
  - Total appointments count
  - Today's appointments
  - Pending appointments
  - Completed appointments
  - Total patients count
- [ ] **Upcoming appointments widget**:
  - Shows next appointments
  - Patient names with links
  - Date and time
  - Quick action buttons
- [ ] **Recent patients widget**
  - Shows recent patients
  - Patient names
  - Last visit date

### 2.4 Schedule Management
- [ ] Navigate to `/doctor/schedule`
- [ ] **View current schedule**:
  - Verify weekly schedule displays
  - Check working days and hours
- [ ] **Edit schedule**:
  - Enable/disable specific days
  - Set start time for each day
  - Set end time for each day
  - Set time slot duration (15min, 30min, 45min, 60min)
  - Save schedule changes
  - Verify success message
- [ ] **Delete time slots**:
  - Test removing availability for specific days

### 2.5 Appointments Management
- [ ] Navigate to `/doctor/appointments`
- [ ] **Filter appointments**:
  - All appointments
  - Today's appointments
  - Upcoming
  - Past
  - Cancelled
- [ ] **Search appointments**:
  - Search by patient name
- [ ] **Appointment actions**:
  - View patient details
  - Mark as completed
  - Cancel appointment (if allowed)
  - Add notes to appointment
- [ ] Verify each appointment shows:
  - Patient name with link to patient details
  - Date and time
  - Status badge
  - Appointment notes from patient
  - Action buttons

### 2.6 Patients List
- [ ] Navigate to `/doctor/patients`
- [ ] Verify list of all patients who booked appointments
- [ ] **Search patients**:
  - Search by name
  - Search by email
- [ ] **Patient information**:
  - Name
  - Email
  - Phone number
  - Total appointments with this doctor
  - Last appointment date
- [ ] **View patient details**:
  - Click on patient
  - See appointment history
  - See patient contact information

### 2.7 Doctor Profile (Verified)
- [ ] Navigate to `/profile` as verified doctor
- [ ] Verify **VERIFIED** banner shows (green success banner)
- [ ] View complete profile information
- [ ] **Edit profile**:
  - Update biography
  - Update consultation fee
  - Update hospital information
  - Update phone number
  - Save changes
  - Verify success message

---

## 3. ADMIN PANEL TESTING

### 3.1 Admin Authentication
- [ ] Navigate to `/auth/signin`
- [ ] Login as admin: `admin@ihealth.ink` / `admin123`
- [ ] Verify redirect to `/admin/dashboard`

### 3.2 Admin Dashboard
- [ ] Navigate to `/admin/dashboard`
- [ ] **Verify system statistics**:
  - Total users count
  - Total doctors count
  - Verified doctors count
  - Pending doctors count
  - Total patients count
  - Total appointments count
  - Today's appointments
  - Pending appointments
- [ ] **Recent activity widget**:
  - Recent registrations
  - Recent appointments
  - Recent verifications

### 3.3 Doctor Verification Workflow
- [ ] Navigate to `/admin/doctors`
- [ ] **Doctors list displays**:
  - All registered doctors
  - Verification status badge
  - Profile completion status
  - Specialization
  - City
  - Registration date
- [ ] **Filter doctors**:
  - All doctors
  - Verified doctors
  - Pending verification
  - Unverified doctors
  - Doctors with incomplete profiles
- [ ] **Search doctors**:
  - Search by name
  - Search by email
  - Search by specialization
  - Search by city
- [ ] **Doctor verification actions**:
  - View doctor details (open modal or detail page)
  - Review doctor profile information:
    * Medical license number
    * Education details
    * Experience
    * Hospital information
  - **Verify doctor**:
    * Click "Verify" button
    * Confirm verification
    * Verify success message
    * Verify status changes to "Verified"
    * Verify doctor now appears in public list
  - **Unverify doctor**:
    * Click "Unverify" button (if already verified)
    * Confirm action
    * Verify status changes to "Unverified"
  - **Delete doctor** (if implemented):
    * Test with caution

### 3.4 Users Management
- [ ] Navigate to `/admin/users`
- [ ] **Users list displays all users**:
  - Name
  - Email
  - Role (Patient, Doctor, Admin)
  - Registration date
  - Status (Active/Inactive)
- [ ] **Filter users**:
  - All users
  - Patients only
  - Doctors only
  - Admins only
  - Active users
  - Inactive users
- [ ] **Search users**:
  - Search by name
  - Search by email
- [ ] **User actions**:
  - View user details
  - Edit user information (if allowed)
  - Deactivate/activate user
  - Delete user (with confirmation)
- [ ] **Role management**:
  - Change user role (if implemented)

---

## 4. CROSS-FEATURE TESTING

### 4.1 Complete Appointment Flow
- [ ] **As Patient**:
  1. Sign up/login
  2. Browse doctors list
  3. Filter by specialization
  4. Select a verified doctor
  5. View doctor profile
  6. Book appointment for tomorrow
  7. View in "My Appointments"

- [ ] **As Doctor**:
  1. Check dashboard for new appointment
  2. View appointment in appointments list
  3. Verify patient details are visible
  4. Check patient appears in patients list

### 4.2 Doctor Lifecycle
- [ ] **New Doctor Journey**:
  1. Sign up as new doctor
  2. Complete profile setup
  3. Verify redirect and pending status
  4. Confirm not visible in public list

- [ ] **Admin Verification**:
  1. Login as admin
  2. View pending doctors
  3. Review doctor profile
  4. Verify doctor

- [ ] **Verified Doctor**:
  1. Login as newly verified doctor
  2. Verify green "Verified" banner
  3. Confirm now visible in public doctors list
  4. Receive appointments

### 4.3 Schedule & Availability
- [ ] **Doctor sets schedule**:
  1. Login as doctor
  2. Go to schedule management
  3. Set Mon-Fri 9AM-5PM availability
  4. Set 30-minute slots
  5. Save schedule

- [ ] **Patient sees availability**:
  1. Login as patient
  2. View doctor profile
  3. Try booking appointment
  4. Verify only Mon-Fri shows available slots
  5. Verify slots are 30 minutes apart
  6. Verify 9AM-5PM range only

---

## 5. UI/UX TESTING

### 5.1 Navigation
- [ ] Test main navigation menu
- [ ] Verify role-based navigation (different for patient/doctor/admin)
- [ ] Test mobile hamburger menu
- [ ] Verify active route highlighting

### 5.2 Responsive Design
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768x1024)
- [ ] Test on mobile (375x667)
- [ ] Verify all forms are usable on mobile
- [ ] Verify tables scroll horizontally on mobile
- [ ] Test navigation menu on mobile

### 5.3 Loading States
- [ ] Verify loading spinners show during data fetch
- [ ] Test skeleton screens (if implemented)
- [ ] Verify no content flash

### 5.4 Error Handling
- [ ] Test form validation errors
- [ ] Test network error messages
- [ ] Test 404 page
- [ ] Test unauthorized access redirects
- [ ] Test empty states (no appointments, no doctors, etc.)

---

## 6. SECURITY TESTING

### 6.1 Authentication
- [ ] Test accessing protected routes without login
- [ ] Verify redirect to sign-in page
- [ ] Test role-based access:
  - Patient cannot access `/doctor/*` routes
  - Patient cannot access `/admin/*` routes
  - Doctor cannot access `/admin/*` routes
  - Non-verified doctor cannot receive appointments

### 6.2 Data Validation
- [ ] Test SQL injection in search fields
- [ ] Test XSS in text inputs
- [ ] Test file upload validation (if implemented)
- [ ] Test email format validation
- [ ] Test phone number format validation

---

## 7. PERFORMANCE TESTING

### 7.1 Page Load Times
- [ ] Measure home page load time (< 2s)
- [ ] Measure dashboard load time (< 3s)
- [ ] Measure doctors list with filters (< 3s)

### 7.2 Database Queries
- [ ] Test doctors list with 50+ doctors
- [ ] Test appointments list with 100+ appointments
- [ ] Test search performance

---

## 8. API ENDPOINTS TESTING

### 8.1 Doctors API
- [ ] GET `/api/doctors` - Returns verified doctors list
- [ ] GET `/api/doctors/[id]` - Returns doctor details
- [ ] POST `/api/doctors` - Create doctor profile
- [ ] PUT `/api/doctors/[id]` - Update doctor profile
- [ ] POST `/api/doctors/verify` - Admin verify doctor

### 8.2 Appointments API
- [ ] GET `/api/appointments` - Get user's appointments
- [ ] POST `/api/appointments` - Create new appointment
- [ ] PUT `/api/appointments/[id]` - Update appointment
- [ ] DELETE `/api/appointments/[id]` - Cancel appointment
- [ ] GET `/api/appointments/availability` - Check doctor availability

### 8.3 Users API
- [ ] GET `/api/users/[id]` - Get user profile
- [ ] PUT `/api/users/[id]` - Update user profile
- [ ] GET `/api/admin/users` - Admin get all users

---

## 9. DATA INTEGRITY TESTING

### 9.1 Appointment Constraints
- [ ] Cannot book past dates
- [ ] Cannot book outside doctor's schedule
- [ ] Cannot double-book same time slot
- [ ] Cannot book with unverified doctor

### 9.2 Profile Constraints
- [ ] Unique email addresses
- [ ] Valid phone numbers
- [ ] Required fields validation

---

## TEST CREDENTIALS

### Patient
- Email: `testpatient@gmail.com`
- Password: `password123`

### Doctor (Verified)
- Email: `testdoctor@gmail.com`
- Password: `password123`

### Admin
- Email: `admin@ihealth.ink`
- Password: `admin123`

---

## AUTOMATED TEST RESULTS

_(Results will be populated below after running automated tests)_
