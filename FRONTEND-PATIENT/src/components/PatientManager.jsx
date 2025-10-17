import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './patientStyle.css'; // Updated CSS file

const PatientManager = () => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({
    id: '',
    name: '',
    age: '',
    gender: '',
    contact: '',
    email: '',
    address: '',
    disease: '',
    doctor: '',
    room: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedPatient, setFetchedPatient] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${import.meta.env.VITE_API_URL}/hospitalapi`;

  useEffect(() => {
    fetchAllPatients();
  }, []);

  const fetchAllPatients = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setPatients(res.data);
    } catch (error) {
      setMessage('Failed to fetch patients.');
    }
  };

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in patient) {
      if (!patient[key] || patient[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addPatient = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, patient);
      setMessage('Patient added successfully.');
      fetchAllPatients();
      resetForm();
    } catch (error) {
      setMessage('Error adding patient.');
    }
  };

  const updatePatient = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, patient);
      setMessage('Patient updated successfully.');
      fetchAllPatients();
      resetForm();
    } catch (error) {
      setMessage('Error updating patient.');
    }
  };

  const deletePatient = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllPatients();
    } catch (error) {
      setMessage('Error deleting patient.');
    }
  };

  const getPatientById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedPatient(res.data);
      setMessage('');
    } catch (error) {
      setFetchedPatient(null);
      setMessage('Patient not found.');
    }
  };

  const handleEdit = (p) => {
    setPatient(p);
    setEditMode(true);
    setMessage(`Editing patient with ID ${p.id}`);
  };

  const resetForm = () => {
    setPatient({
      id: '',
      name: '',
      age: '',
      gender: '',
      contact: '',
      email: '',
      address: '',
      disease: '',
      doctor: '',
      room: ''
    });
    setEditMode(false);
  };

  return (
    <div className="patient-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Patient Records</h2>

      <div>
        <h3>{editMode ? 'Edit Patient' : 'Add Patient'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="Patient ID" value={patient.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={patient.name} onChange={handleChange} />
          <input type="number" name="age" placeholder="Age" value={patient.age} onChange={handleChange} />
          <select name="gender" value={patient.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="text" name="contact" placeholder="Contact Number" value={patient.contact} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={patient.email} onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" value={patient.address} onChange={handleChange} />
          <input type="text" name="disease" placeholder="Disease / Condition" value={patient.disease} onChange={handleChange} />
          <input type="text" name="doctor" placeholder="Attending Doctor" value={patient.doctor} onChange={handleChange} />
          <input type="text" name="room" placeholder="Room Number" value={patient.room} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addPatient}>Add Patient</button>
          ) : (
            <>
              <button className="btn-green" onClick={updatePatient}>Update Patient</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Patient By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter Patient ID"
        />
        <button className="btn-blue" onClick={getPatientById}>Fetch</button>

        {fetchedPatient && (
          <div>
            <h4>Patient Found:</h4>
            <pre>{JSON.stringify(fetchedPatient, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Patients</h3>
        {patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(patient).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id}>
                    {Object.keys(patient).map((key) => (
                      <td key={key}>{p[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(p)}>Edit</button>
                        <button className="btn-red" onClick={() => deletePatient(p.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default PatientManager;
