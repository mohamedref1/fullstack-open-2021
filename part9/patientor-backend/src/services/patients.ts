import { GetPatientFn, GetToDisplayPatientFn, AddNewPatientFn, FindPatientFn, AddNewEntryFn } from './patients.types';
import patients from '../data/patients';

const getPatients: GetPatientFn = () => {
  return patients;
};

const getToDisplayPatients: GetToDisplayPatientFn = () => {
  return patients.map((p) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = p as any;
    delete obj.ssn;
    return obj;
  });
};

const findPatient: FindPatientFn = (id) => {
  const patient = patients.find((patient) => patient.id === id);

  if (!patient) {
    throw new Error(
      `User Error: cannot find an entry matches the given id: ${id}`
    );
  }

  return patient;
};

const addNewPatient: AddNewPatientFn = (patient) => {
  patients.push(patient);

  return {
    id: patients[patients.length - 1].id,
    name: patients[patients.length - 1].name,
    dateOfBirth: patients[patients.length - 1].dateOfBirth,
    occupation: patients[patients.length - 1].occupation,
    gender: patients[patients.length - 1].gender,
    entries: []
  };
};

const addNewEntry: AddNewEntryFn = (id, entry) => {
  const patientIdx = patients.findIndex((p) => p.id === id);

  if (patientIdx === -1) {
    throw new Error('Service Error: patient not found');
  }

  patients[patientIdx].entries = patients[patientIdx].entries.concat(entry);
  return entry;
};

export default {
  getPatients,
  getToDisplayPatients,
  findPatient,
  addNewPatient,
  addNewEntry
};