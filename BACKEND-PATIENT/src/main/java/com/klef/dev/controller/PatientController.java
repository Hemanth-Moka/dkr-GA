package com.klef.dev.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.entity.Patients;
import com.klef.dev.service.PatientService;

@RestController
@RequestMapping("/hospitalapi/")
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("/")
    public String home() {
        return "Patient Management";
    }

    
    @PostMapping("/add")
    public ResponseEntity<Patients> addPatient(@RequestBody Patients patient) {
        Patients savedPatient = patientService.addPatient(patient);
        return new ResponseEntity<>(savedPatient, HttpStatus.CREATED);
    }

 
    @GetMapping("/all")
    public ResponseEntity<List<Patients>> getAllPatients() {
        List<Patients> patientList = patientService.getAllPatients();
        return new ResponseEntity<>(patientList, HttpStatus.OK);
    }

   
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getPatientById(@PathVariable int id) {
        Patients patient = patientService.getPatientById(id);
        if (patient != null) {
            return new ResponseEntity<>(patient, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Patient with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/update")
    public ResponseEntity<?> updatePatient(@RequestBody Patients patient) {
        Patients existing = patientService.getPatientById(patient.getId());
        if (existing != null) {
            Patients updatedPatient = patientService.updatePatient(patient);
            return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Patient with ID " + patient.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable int id) {
        Patients existing = patientService.getPatientById(id);
        if (existing != null) {
            patientService.deletePatientById(id);
            return new ResponseEntity<>("Patient with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Patient with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
