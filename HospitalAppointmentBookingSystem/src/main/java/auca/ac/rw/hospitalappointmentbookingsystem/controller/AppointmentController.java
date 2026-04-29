package auca.ac.rw.hospitalappointmentbookingsystem.controller;

import auca.ac.rw.hospitalappointmentbookingsystem.model.Appointment;
import auca.ac.rw.hospitalappointmentbookingsystem.model.AppointmentStatus;
import auca.ac.rw.hospitalappointmentbookingsystem.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable UUID id) {
        return appointmentService.getAppointmentById(id);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getByDoctor(@PathVariable UUID doctorId) {
        return appointmentService.getAppointmentsByDoctor(doctorId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getByPatient(@PathVariable UUID patientId) {
        return appointmentService.getAppointmentsByPatient(patientId);
    }

    @GetMapping("/date/{date}")
    public List<Appointment> getByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return appointmentService.getAppointmentsByDate(date);
    }

    @GetMapping("/status/{status}")
    public List<Appointment> getByStatus(@PathVariable AppointmentStatus status) {
        return appointmentService.getAppointmentsByStatus(status);
    }

    @PostMapping("/book")
    public ResponseEntity<Appointment> bookAppointment(
            @RequestParam UUID patientId,
            @RequestParam UUID doctorId,
            @Valid @RequestBody Appointment request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(appointmentService.bookAppointment(patientId, doctorId, request));
    }

    @PatchMapping("/{id}/status")
    public Appointment updateStatus(@PathVariable UUID id, @RequestParam AppointmentStatus status) {
        return appointmentService.updateStatus(id, status);
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelAppointment(@PathVariable UUID id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable UUID id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }
}
