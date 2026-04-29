package auca.ac.rw.hospitalappointmentbookingsystem.service;

import auca.ac.rw.hospitalappointmentbookingsystem.exception.ResourceNotFoundException;
import auca.ac.rw.hospitalappointmentbookingsystem.model.Patient;
import auca.ac.rw.hospitalappointmentbookingsystem.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(UUID id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", id));
    }

    public Patient getPatientByEmail(String email) {
        return patientRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with email: " + email));
    }

    public Patient createPatient(Patient patient) {
        if (patientRepository.existsByEmail(patient.getEmail())) {
            throw new IllegalArgumentException("A patient with this email already exists");
        }
        return patientRepository.save(patient);
    }

    public Patient updatePatient(UUID id, Patient updates) {
        Patient existing = getPatientById(id);
        existing.setFirstName(updates.getFirstName());
        existing.setLastName(updates.getLastName());
        existing.setPhone(updates.getPhone());
        existing.setDateOfBirth(updates.getDateOfBirth());
        existing.setAddress(updates.getAddress());
        return patientRepository.save(existing);
    }

    public void deletePatient(UUID id) {
        getPatientById(id);
        patientRepository.deleteById(id);
    }
}