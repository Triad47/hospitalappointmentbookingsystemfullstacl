package auca.ac.rw.hospitalappointmentbookingsystem.service;

import auca.ac.rw.hospitalappointmentbookingsystem.exception.ResourceNotFoundException;
import auca.ac.rw.hospitalappointmentbookingsystem.model.Doctor;
import auca.ac.rw.hospitalappointmentbookingsystem.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(UUID id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", id));
    }

    public List<Doctor> getDoctorsBySpecialization(String specialization) {
        return doctorRepository.findBySpecialization(specialization);
    }

    public List<Doctor> getAvailableDoctors() {
        return doctorRepository.findByAvailable(true);
    }

    public Doctor createDoctor(Doctor doctor) {
        if (doctorRepository.existsByEmail(doctor.getEmail())) {
            throw new IllegalArgumentException("A doctor with this email already exists");
        }
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(UUID id, Doctor updates) {
        Doctor existing = getDoctorById(id);
        existing.setFirstName(updates.getFirstName());
        existing.setLastName(updates.getLastName());
        existing.setSpecialization(updates.getSpecialization());
        existing.setPhone(updates.getPhone());
        existing.setAvailable(updates.isAvailable());
        return doctorRepository.save(existing);
    }

    public void deleteDoctor(UUID id) {
        getDoctorById(id);
        doctorRepository.deleteById(id);
    }
}