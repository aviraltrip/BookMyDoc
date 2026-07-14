# BookMyDoc

BookMyDoc is a comprehensive MERN-stack medical appointment booking and practice management application. It consists of three main components: a client-facing React portal, an Admin & Doctor React panel, and a unified Node.js / Express backend REST API.

---

## Features

### 1. User Portal (Client Frontend)
- **Doctor Directory:** Browse all registered doctors or filter by specialty categories (General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist).
- **Appointment Booking:** View doctor availability and book active 30-minute calendar slots for the next 7 days.
- **My Appointments:** Track booking history, pay fees online, or cancel upcoming visits.
- **Profile Management:** View and edit personal biography, profile image, contact details (phone, address), gender, and date of birth.

### 2. Admin Portal (Management Panel)
- **Dashboard Overview:** Displays counts of Doctors, Appointments, and Patients, alongside a list of the 5 latest bookings with cancellation handling.
- **Add Doctor:** Register new doctor credentials, degree, address, fees, speciality, and profile photos.
- **Doctors List:** View and toggle availability check-boxes for registered doctors in real-time.
- **All Appointments:** Table list tracking booking dates, patient ages, doctor assignments, and payment statuses.

### 3. Doctor Portal (Practice Management Backend)
- **Practice Dashboard:** Track total appointments, unique patients treated, total earnings, and lists latest booking queues.
- **Appointment Handler:** Triage appointments to mark them as completed or cancel them directly.
- **Doctor Profile:** Edit practice details, fees, description, and availability.

### 4. Robust Backend API
- Role-based JSON Web Tokens (JWT) routing security (`atoken` for Admin, `dtoken` for Doctor, and `token` for Patient).
- Cloudinary cloud storage image uploads.
- Razorpay payment gateway integration for appointment booking checkouts.

---

## Technical Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend & Admin** | React.js (Vite), Tailwind CSS v4, React Router DOM, Axios, React Toastify |
| **Backend** | Node.js, Express.js, MongoDB (Mongoose), Cloudinary API, Razorpay SDK, JWT, Multer |

---

## Folder Structure

```text
BookMyDoc/
├── admin/          # Admin & Doctor Management Panel (React + Tailwind CSS)
├── backend/        # Express REST API (Node.js + MongoDB + Cloudinary + Razorpay)
└── frontend/       # User/Patient Booking Portal (React + Tailwind CSS)
```

---

## API Documentation

### Admin Endpoints (`/api/admin`)
- `POST /login` - Log in Admin using credentials.
- `POST /add-doctor` - Add new doctor details (includes image upload).
- `POST /all-doctors` - Retrieve list of all doctors.
- `POST /change-availability` - Toggle doctor's availability status.
- `GET /appointments` - Retrieve list of all bookings.
- `POST /cancel-appointment` - Cancel an appointment.
- `GET /dashboard` - Fetch stats and latest bookings.

### User Endpoints (`/api/user`)
- `POST /register` - Register a new patient account.
- `POST /login` - Authenticate patient.
- `POST /get-profile` - Get patient profile.
- `POST /update-profile` - Update patient details (includes image upload).
- `POST /book-appointment` - Register a slot with a doctor.
- `GET /appointments` - Retrieve all appointments booked by user.
- `POST /cancel-appointment` - Cancel booking.
- `POST /payment-razor` - Initialize Razorpay checkout transaction.
- `POST /verifyRazorpay` - Verify payments.

### Doctor Endpoints (`/api/doctor`)
- `GET /list` - Fetch public doctor details.
- `POST /login` - Doctor login.
- `GET /appointments` - Fetch appointments list for logged-in doctor.
- `POST /complete-appointment` - Complete appointment.
- `POST /cancel-appointment` - Cancel appointment.
- `GET /profile` - Retrieve doctor profile details.
- `POST /update-profile` - Save edited doctor profile configurations.
- `GET /dashboard` - Retrieve doctor stats and latest queues.

---

## Setup & Installation

### Prerequisites
- Node.js installed.
- MongoDB Atlas cluster account.
- Cloudinary credentials.

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd BookMyDoc
   ```

2. **Backend Server Setup**
   ```bash
   cd backend
   npm install
   ```
   *Create a `.env` file inside `/backend` containing:*
   ```env
   PORT=4000
   MONGODB_URI=<Your_MongoDB_URI>
   CLOUDINARY_NAME=<Your_Cloudinary_Name>
   CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
   CLOUDINARY_SECRET_KEY=<Your_Cloudinary_Secret_Key>
   ADMIN_EMAIL=admin@bookmydoc.com
   ADMIN_PASSWORD=admin123
   JWT_SECRET=<Your_JWT_Secret_Key>
   RAZORPAY_KEY_ID=<Your_Razorpay_Key_Id>
   RAZORPAY_KEY_SECRET=<Your_Razorpay_Key_Secret>
   CURRENCY=INR
   ```
   *Start API Server:*
   ```bash
   npm run server
   ```

3. **User Portal Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   *Create a `.env` file inside `/frontend` containing:*
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   VITE_RAZORPAY_KEY_ID=<Your_Razorpay_Key_Id>
   ```
   *Start Portal:*
   ```bash
   npm run dev
   ```

4. **Admin/Doctor Panel Setup**
   ```bash
   cd ../admin
   npm install
   ```
   *Create a `.env` file inside `/admin` containing:*
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   ```
   *Start Panel:*
   ```bash
   npm run dev
   ```
