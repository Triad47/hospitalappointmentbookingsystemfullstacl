# Hospital Appointment Booking System

## Overview
The **Hospital Appointment Booking System** is a full-stack web application designed to streamline the process of scheduling and managing medical appointments. It provides an intuitive interface for patients to book appointments and for hospital staff to manage doctors, patients, and appointment schedules efficiently.

## System Architecture
This project is divided into two main components:
- **Backend:** A robust RESTful API built with Spring Boot.
- **Frontend:** A modern, responsive user interface built with React and Vite.

## Features
- **Patient Management:** Register and manage patient profiles.
- **Doctor Management:** Manage doctor schedules and profiles.
- **Appointment Scheduling:** Book, update, and cancel appointments seamlessly.
- **Modern UI:** Built with Tailwind CSS for a fully responsive and clean interface.

## Tech Stack

### Backend
- **Java** (version 26)
- **Spring Boot** (version 4.0.6)
  - Spring Web MVC (RESTful APIs)
  - Spring Data JPA (Database ORM)
  - Spring Validation
- **MySQL** (Relational Database)
- **Lombok** (Boilerplate code reduction)
- **Maven** (Build automation)

### Frontend
- **React** (version 19)
- **Vite** (Build tool)
- **JavaScript (JSX)** 
- **Tailwind CSS** (Styling and responsive design)

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- [Java Development Kit (JDK) 26](https://jdk.java.net/) or higher
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [MySQL](https://www.mysql.com/) Server
- [Maven](https://maven.apache.org/) (optional, as the project includes the Maven Wrapper)

## Setup and Installation

### 1. Database Configuration
1. Open your MySQL client and create a new database for the application (e.g., `hospital_db`).
2. Update the `application.properties` or `application.yml` file in the backend (`src/main/resources/`) with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### 2. Backend Setup
1. Open a terminal and navigate to the backend project directory (`HospitalAppointmentBookingSystem`).
2. Run the application using the Maven Wrapper:
   ```bash
   # On Windows
   ./mvnw.cmd spring-boot:run

   # On Linux/macOS
   ./mvnw spring-boot:run
   ```
   *The backend server should now be running on `http://localhost:8080`.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend project directory (`hospitalappointmentbookingsystemreact/vite-project`).
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend application should now be accessible via the URL provided by Vite (typically `http://localhost:5173`).*

## API Endpoints Overview
The backend exposes REST APIs for managing the system's core entities:
- `/api/appointments` - Endpoints for booking and managing appointments.
- `/api/doctors` - Endpoints for retrieving and managing doctors.
- `/api/patients` - Endpoints for registering and managing patients.

*(Note: Actual paths might vary slightly depending on your Controller mappings)*

## Recent Updates
- **Frontend Migration:** The frontend project has been successfully migrated from TypeScript (`.tsx`) to standard JavaScript (`.jsx`) to simplify the development process and reduce build complexity, while retaining the powerful capabilities of React and Vite.

## License
This project is open-source and available under the MIT License.
