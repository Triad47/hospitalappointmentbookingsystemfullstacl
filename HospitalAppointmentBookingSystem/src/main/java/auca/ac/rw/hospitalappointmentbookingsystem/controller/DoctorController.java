package auca.ac.rw.hospitalappointmentbookingsystem.controller;

import auca.ac.rw.hospitalappointmentbookingsystem.model.Doctor;
import auca.ac.rw.hospitalappointmentbookingsystem.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable UUID id) {
        return doctorService.getDoctorById(id);
    }

    @GetMapping("/specialization/{specialization}")
    public List<Doctor> getBySpecialization(@PathVariable String specialization) {
        return doctorService.getDoctorsBySpecialization(specialization);
    }

    @GetMapping("/available")
    public List<Doctor> getAvailableDoctors() {
        return doctorService.getAvailableDoctors();
    }

    @PostMapping
    public ResponseEntity<Doctor> createDoctor(@Valid @RequestBody Doctor doctor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(doctorService.createDoctor(doctor));
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable UUID id, @Valid @RequestBody Doctor doctor) {
        return doctorService.updateDoctor(id, doctor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable UUID id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }
}
