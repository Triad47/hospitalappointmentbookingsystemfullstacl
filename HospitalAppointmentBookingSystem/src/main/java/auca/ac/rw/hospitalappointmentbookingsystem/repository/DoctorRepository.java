package auca.ac.rw.hospitalappointmentbookingsystem.repository;

import auca.ac.rw.hospitalappointmentbookingsystem.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, UUID> {

    List<Doctor> findBySpecialization(String specialization);

    List<Doctor> findByAvailable(boolean available);

    boolean existsByEmail(String email);
}