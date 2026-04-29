package auca.ac.rw.hospitalappointmentbookingsystem.service;

import auca.ac.rw.hospitalappointmentbookingsystem.exception.ResourceNotFoundException;
import auca.ac.rw.hospitalappointmentbookingsystem.model.Appointment;
import auca.ac.rw.hospitalappointmentbookingsystem.model.AppointmentStatus;
import auca.ac.rw.hospitalappointmentbookingsystem.model.Doctor;
import auca.ac.rw.hospitalappointmentbookingsystem.model.Patient;
import auca.ac.rw.hospitalappointmentbookingsystem.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorService doctorService;
    private final PatientService patientService;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(UUID id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", id));
    }

    public List<Appointment> getAppointmentsByDoctor(UUID doctorId) {
        doctorService.getDoctorById(doctorId);
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public List<Appointment> getAppointmentsByPatient(UUID patientId) {
        patientService.getPatientById(patientId);
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByAppointmentDate(date);
    }

    public List<Appointment> getAppointmentsByStatus(AppointmentStatus status) {
        return appointmentRepository.findByStatus(status);
    }

    public Appointment bookAppointment(UUID patientId, UUID doctorId, Appointment request) {
        Patient patient = patientService.getPatientById(patientId);
        Doctor doctor = doctorService.getDoctorById(doctorId);

        if (!doctor.isAvailable()) {
            throw new IllegalArgumentException("Doctor is not available for appointments");
        }

        boolean slotTaken = appointmentRepository.existsByDoctorIdAndAppointmentDateAndAppointmentTime(
                doctorId, request.getAppointmentDate(), request.getAppointmentTime());
        if (slotTaken) {
            throw new IllegalArgumentException("This time slot is already booked for the selected doctor");
        }

        Appointment appointment = new Appointment(
                null, patient, doctor,
                request.getAppointmentDate(),
                request.getAppointmentTime(),
                AppointmentStatus.PENDING,
                request.getReason(),
                request.getNotes()
        );
        return appointmentRepository.save(appointment);
    }

    public Appointment updateStatus(UUID id, AppointmentStatus status) {
        Appointment appointment = getAppointmentById(id);
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

    public void cancelAppointment(UUID id) {
        Appointment appointment = getAppointmentById(id);
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    public void deleteAppointment(UUID id) {
        getAppointmentById(id);
        appointmentRepository.deleteById(id);
    }
}