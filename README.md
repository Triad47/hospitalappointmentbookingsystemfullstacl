# Hospital Appointment Booking System (Full-Stack)

Welcome to the **Hospital Appointment Booking System** repository! This is a complete full-stack web application designed to streamline the process of scheduling and managing medical appointments.

It provides an intuitive interface for patients to book appointments and for hospital staff to manage doctors, patients, and appointment schedules efficiently.

---

## 🏗️ System Architecture & How It's Built

This project follows a decoupled client-server architecture, divided into two main applications: the Spring Boot Backend and the React Frontend.

### 1. Backend Architecture (Spring Boot)
Located in the `HospitalAppointmentBookingSystem/` directory.
- **Framework**: Spring Boot (v4.0.6) running on **Java 26**.
- **RESTful API Layer**: Built using `spring-boot-starter-webmvc`. It exposes JSON-based REST APIs to be consumed by the frontend.
- **Data Access Layer**: Uses `spring-boot-starter-data-jpa` and Hibernate. It handles all database transactions and entity mappings.
- **Database**: **MySQL**. The application connects to MySQL and uses `spring.jpa.hibernate.ddl-auto=update` to automatically generate and update tables based on the backend JPA entities.
- **Build Tool**: Maven (Maven Wrapper `mvnw` included for ease of use).

### 2. Frontend Architecture (React + Vite)
Located in the `hospitalappointmentbookingsystemreact/vite-project/` directory.

The frontend is a modern Single Page Application (SPA) built for high performance and excellent user experience. 

- **Core Framework**: **React 19** utilizing modern Functional Components and React Hooks (`useState`, `useEffect`, etc.) for state management and side effects.
- **Build Engine**: **Vite**. Replaces older tools like Create React App (CRA) or Webpack to provide near-instant Hot Module Replacement (HMR) and highly optimized production bundling.
- **Language**: **JavaScript (JSX)**. The project was recently migrated from TypeScript (`.tsx`) to standard JavaScript to streamline development, reduce build friction, and simplify the codebase.
- **Styling**: **Tailwind CSS v4**. A utility-first CSS framework that allows for rapid UI development directly within the JSX files, ensuring a fully responsive and modern design system without writing custom CSS files.
- **Routing**: Client-side routing is handled to navigate between different views without reloading the page.

#### 📂 Frontend Component Structure
The UI is modularized into dedicated React components located in `src/`:
- `main.jsx`: The entry point that mounts the React application to the DOM.
- `App.jsx`: The root component that handles the main layout, navigation bar, and routing logic.
- `DoctorsPage.jsx`: Fetches data from `/api/doctors`. Displays a list/grid of doctors, handles the creation of new doctors via a form, and allows deleting doctors.
- `PatientsPage.jsx`: Interacts with `/api/patients`. Allows registering new patients and viewing existing patient records.
- `AppointmentPage.jsx`: The booking interface. It fetches available doctors and patients, providing a form to schedule a new medical appointment (`POST /api/appointments`).
- `AppointmentsListPage.jsx`: A dashboard view fetching data from `/api/appointments` to display all scheduled appointments in a tabular format, complete with options to cancel them.
- `index.css`: The main stylesheet that injects Tailwind CSS utility classes into the project.

---

## 🚀 Features

- **Doctor Management**: View the roster of available doctors, add new doctors, and remove them from the system.
- **Patient Registration**: Add and manage patient profiles.
- **Appointment Scheduling**: Patients can easily schedule appointments with specific doctors using a dedicated booking form.
- **Appointment Dashboard**: View all scheduled appointments in a clean table, check their current status, and cancel appointments if necessary.
- **Modern UI**: Clean, dynamic, responsive, and intuitive user interface built with Tailwind CSS.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. **Java Development Kit (JDK) 26** or higher.
2. **Node.js** (version 18 or higher recommended) and **npm** (Node Package Manager).
3. **MySQL Server** installed and running on default port `3306`.

---

## 🛠️ Step-by-Step Guide: How to Run It Locally

To get the full application up and running locally, you must run both the backend and frontend servers simultaneously.

### Step 1: Database Setup
Make sure your MySQL server is running.
The application is configured to connect to a database named `hospitalappointmentbookingsystem` using the username `root` and no password. 

*Note: The application uses `createDatabaseIfNotExist=true` in its connection string, meaning the database schema will be automatically created upon the first launch!*

If you need to change your database credentials, modify the `application.properties` file located at:
`HospitalAppointmentBookingSystem/src/main/resources/application.properties`

### Step 2: Start the Backend Server (Spring Boot)
1. Open a terminal or command prompt.
2. Navigate to the backend directory:
   ```bash
   cd HospitalAppointmentBookingSystem
   ```
3. Run the application using the Maven Wrapper:
   - **On Windows**:
     ```cmd
     ./mvnw.cmd spring-boot:run
     ```
   - **On macOS/Linux**:
     ```bash
     ./mvnw spring-boot:run
     ```
*The Spring Boot REST API server will start and listen for requests on `http://localhost:8080`.*

### Step 3: Start the Frontend Application (React + Vite)
1. Open a **new** terminal window (leave the backend terminal running).
2. Navigate to the frontend Vite project directory:
   ```bash
   cd hospitalappointmentbookingsystemreact/vite-project
   ```
3. Install the required Node dependencies (only needed the first time):
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
*The terminal will output a local URL (typically `http://localhost:5173`). Open this URL in your web browser to access the application! Vite's HMR will automatically reload the page if you make changes to the React code.*

### Step 4: Building the Frontend for Production (Optional)
If you wish to compile the React application for production deployment:
```bash
npm run build
```
This command will bundle the application into static HTML, JavaScript, and CSS files inside the `dist/` directory, optimized for performance and ready to be served by a web server (like Nginx, Apache, or even Spring Boot's static folder).

---

## 🌐 API Endpoints Overview
The React frontend (`fetch` or `axios`) communicates directly with the Spring Boot backend using the following key REST endpoints:

- **Doctors API** (`/api/doctors`)
  - `GET` - Fetch the list of all doctors
  - `POST` - Register a new doctor
  - `DELETE /:id` - Remove a doctor
- **Patients API** (`/api/patients`)
  - `GET` - Fetch all patients
  - `POST` - Register a new patient
- **Appointments API** (`/api/appointments`)
  - `GET` - Fetch all appointments
  - `POST` - Book a new appointment
  - `PATCH /:id/cancel` - Cancel a specific appointment

---

