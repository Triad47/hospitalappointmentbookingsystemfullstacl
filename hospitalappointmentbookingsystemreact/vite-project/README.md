# Hospital Appointment Booking System (React Frontend)

A modern, responsive React frontend application for managing hospital appointments, built with Vite and Tailwind CSS.

## Features

- **Doctor Management**: View, add, and remove doctors from the system.
- **Book Appointments**: Schedule appointments with specific doctors using a dedicated booking form.
- **Appointment Management**: View all scheduled appointments, check their status, and cancel appointments if needed.
- **Modern UI**: Clean and intuitive user interface styled with Tailwind CSS.

## Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **JavaScript (ES6+)**

## Prerequisites

- Node.js (v18 or higher recommended)
- A running backend server on `http://localhost:8080` that exposes the following endpoints:
  - `GET /api/doctors`
  - `POST /api/doctors`
  - `DELETE /api/doctors/:id`
  - `GET /api/appointments`
  - `POST /api/appointments`
  - `PATCH /api/appointments/:id/cancel`

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

The source code is located in the `src/` directory:

- `App.jsx`: Main application layout and navigation routing.
- `DoctorsPage.jsx`: Component for viewing and managing the list of doctors.
- `AppointmentPage.jsx`: Component containing the form to book new appointments.
- `AppointmentsListPage.jsx`: Component for viewing and managing all booked appointments.
- `main.jsx`: Application entry point.
- `index.css`: Global styles and Tailwind configuration.

## Recent Updates

This project was recently migrated from TypeScript (`.tsx`) to JavaScript (`.jsx`) for simpler development and maintenance. The TypeScript configuration files have been removed, and the build process now natively uses Vite for JavaScript/JSX bundling.
