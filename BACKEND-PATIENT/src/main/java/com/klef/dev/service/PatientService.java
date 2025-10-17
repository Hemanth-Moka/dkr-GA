package com.klef.dev.service;

import java.util.List;
import com.klef.dev.entity.Patients;

public interface PatientService {

    Patients addPatient(Patients patient);

    List<Patients> getAllPatients();

    Patients getPatientById(int id);

    Patients updatePatient(Patients patient);

    void deletePatientById(int id);
}
