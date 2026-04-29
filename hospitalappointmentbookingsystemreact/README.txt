Hospital Appointment Booking System
===================================
ADVENTIST UNIVERSITY OF CENTRAL AFRICA
Faculty of Information Technology & Internet
In-Class Practical Quiz — Web Application Development

Name: ________________________________ 
ID: ____________________ 
Date: ______________

1. PROJECT OVERVIEW
-------------------
This is a full-stack web application designed for a clinic where patients can schedule appointments with available doctors. 
The system consists of:
- Backend: Spring Boot REST API (Java, Spring Data JPA, PostgreSQL)
- Frontend: React JS (Vite, React 19, Tailwind CSS)

2. PREREQUISITES
----------------
To run this project locally, you must have the following installed:
- Java Development Kit (JDK) 17 or higher
- Maven (or use the included Maven wrapper)
- Node.js (v18 or higher) and npm
- PostgreSQL database server running locally

3. BACKEND SETUP (Spring Boot)
------------------------------
1. Create a PostgreSQL database (e.g., named "hospital_db" or as configured in your application.properties).
2. Ensure your PostgreSQL credentials match what is specified in `src/main/resources/application.properties`.
3. Open a terminal, navigate to the backend project root folder.
4. Run the Spring Boot application:
   Using Maven: 
     mvn spring-boot:run
   (Alternatively, open the project in your IDE like IntelliJ IDEA or Eclipse and run the main application class).
5. The backend server will start on http://localhost:8080.
6. Note: CORS is configured to allow requests from the React frontend running on port 5173.

4. FRONTEND SETUP (React JS)
----------------------------
1. Open a terminal and navigate to the frontend project folder (e.g., `vite-project`).
2. Install the necessary Node dependencies by running:
     npm install
3. Start the development server by running:
     npm run dev
4. Open your web browser and navigate to the URL provided (usually http://localhost:5173).

5. USAGE GUIDE
--------------
- Doctors Page: Navigate to the "Doctors" tab to view all registered doctors. You can add a new doctor by filling out the form (Full Name, Specialization, Department, Availability) and clicking "Add Doctor".
- Book Appointment: Navigate to "Book Appointment". Provide the Patient Name, Patient ID, select an available Doctor from the dropdown, choose an Appointment Date, and select a Time Slot. Click "Book Appointment".
- Appointments List: Navigate to the "Appointments" tab to view all booked appointments. You can cancel an appointment by clicking the red "Cancel" button, which will immediately remove it from the system.

6. API ENDPOINTS SUMMARY
------------------------
Doctors:
- GET    /api/doctors        (Fetch all doctors)
- GET    /api/doctors/{id}   (Fetch a single doctor)
- POST   /api/doctors        (Add a new doctor)
- PUT    /api/doctors/{id}   (Update doctor details)

Appointments:
- GET    /api/appointments        (Fetch all appointments)
- POST   /api/appointments        (Book a new appointment)
- DELETE /api/appointments/{id}   (Cancel an appointment)
