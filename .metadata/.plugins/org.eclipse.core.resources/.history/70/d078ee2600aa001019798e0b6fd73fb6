package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.dev.entity.Patients;

@Repository
public interface PatientRepository extends JpaRepository<Patients, Integer> {
    Patients findByEmail(String email);
    Patients findByContact(String contact);
}
