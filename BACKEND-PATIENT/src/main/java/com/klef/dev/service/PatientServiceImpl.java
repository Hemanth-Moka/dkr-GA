package com.klef.dev.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.dev.entity.Patients;
import com.klef.dev.repository.PatientRepository;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Patients addPatient(Patients patient) {
        return patientRepository.save(patient);
    }

    @Override
    public List<Patients> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patients getPatientById(int id) {
        Optional<Patients> opt = patientRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Patients updatePatient(Patients patient) {
        return patientRepository.save(patient);
    }

    @Override
    public void deletePatientById(int id) {
        patientRepository.deleteById(id);
    }
}
