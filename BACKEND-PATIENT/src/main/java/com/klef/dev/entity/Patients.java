package com.klef.dev.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "patients_table")
public class Patients {

    @Id
    @Column(name = "patient_id")
    private int id;

    @Column(name = "patient_name", nullable = false, length = 50)
    private String name;

    @Column(name = "patient_age", nullable = false)
    private int age;

    @Column(name = "patient_gender", nullable = false, length = 10)
    private String gender; // Male or Female

    @Column(name = "patient_contact", nullable = false, unique = true, length = 20)
    private String contact;

    @Column(name = "patient_email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "patient_address", nullable = false, length = 100)
    private String address;

    @Column(name = "patient_disease", nullable = false, length = 50)
    private String disease;

    @Column(name = "attending_doctor", nullable = false, length = 50)
    private String doctor;

    @Column(name = "room_number", nullable = false, length = 20)
    private String room;



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    @Override
    public String toString() {
        return "Patients [id=" + id + ", name=" + name + ", age=" + age + ", gender=" + gender +
                ", contact=" + contact + ", email=" + email + ", address=" + address +
                ", disease=" + disease + ", doctor=" + doctor + ", room=" + room + "]";
    }
}
