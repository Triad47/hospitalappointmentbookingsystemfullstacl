package auca.ac.rw.hospitalappointmentbookingsystem.repository;

import auca.ac.rw.hospitalappointmentbookingsystem.model.Appointment;
import auca.ac.rw.hospitalappointmentbookingsystem.model.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

    List<Appointment> findByDoctorId(UUID doctorId);

    List<Appointment> findByPatientId(UUID patientId);

    List<Appointment> findByStatus(AppointmentStatus status);

    List<Appointment> findByAppointmentDate(LocalDate date);

    boolean existsByDoctorIdAndAppointmentDateAndAppointmentTime(
            UUID doctorId, LocalDate date, LocalTime time);
}