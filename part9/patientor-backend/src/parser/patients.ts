import { Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from '../data/patients.types';
import { PatientParserFn, EntryParserFn } from './patients.types';
import { isString, isDate, isGender, isValidEntries, isValidEntry } from './helper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const assertNever = (_value: never): never => {
  throw new Error('invalid entry type');
};

const patientParser: PatientParserFn = (d) => {
  if (!isString(d.id) || d.id === '') {
    throw new Error('Parser Error: missing or invalid id');
  }

  if (!isString(d.name) || d.name === '') {
    throw new Error('Parser Error: missing or invalid name');
  }

  if (!isString(d.dateOfBirth) || !isDate(d.dateOfBirth)) {
    throw new Error('Parser Error: missing or invalid date of birth');
  }

  if (!isString(d.ssn) || d.ssn === '') {
    throw new Error('Parser Error: missing or invalid ssn');
  }

  if (!isString(d.occupation) || d.occupation === '') {
    throw new Error('Parser Error: missing or invalid occupation');
  }

  if (!isString(d.gender) || !isGender(d.gender)) {
    throw new Error('Parser Error: missing or invalid gender');
  }

  if (!isValidEntries(d.entries)) {
    throw new Error('Parser Error: missing or invalid entries');
  }

  const gender: Gender = d.gender === 'male'
    ? Gender.MALE
    : d.gender === 'female'
      ? Gender.FEMALE
      : Gender.OTHER;

  return {
    id: d.id,
    name: d.name,
    dateOfBirth: d.dateOfBirth,
    ssn: d.ssn,
    occupation: d.occupation,
    entries: d.entries,
    gender
  };
};

const entryParser: EntryParserFn = (d) => {
  if (!isValidEntry(d)) {
    throw new Error('Parser Error: missing or invalid entry');
  }

  if (
    !isString(d.id) ||
    !isString(d.type) ||
    !isString(d.description) ||
    !isDate(d.date) ||
    !isString(d.specialist) ||
    (d.diagnosisCodes && !(d.diagnosisCodes instanceof Array)) ||
    (d.diagnosisCodes && !(d.diagnosisCodes.every((d) => isString(d))))
  ) {
    throw new Error('Parser Error: invalid entry');
  }

  switch (d.type) {
    case 'Hospital':
      if (
        !d.discharge ||
        !isDate(d.discharge.date) ||
        !isString(d.discharge.criteria)
      ) {
        throw new Error('Parser Error: invalid hospital entry');
      }

      return {
        id: d.id,
        type: d.type,
        description: d.description,
        date: d.date,
        specialist: d.specialist,
        diagnosisCodes: d.diagnosisCodes,
        discharge: d.discharge
      } as HospitalEntry;
    case 'HealthCheck':
      if (
        d.healthCheckRating === undefined ||
        !(Object.values(HealthCheckRating).includes(d.healthCheckRating))
      ) {
        throw new Error('Parser Error: invalid health check entry');
      }

      return {
        id: d.id,
        type: d.type,
        description: d.description,
        date: d.date,
        specialist: d.specialist,
        diagnosisCodes: d.diagnosisCodes,
        healthCheckRating: d.healthCheckRating
      } as HealthCheckEntry;
    case 'OccupationalHealthcare':
      if (
        !isString(d.employerName) ||
        !d.sickLeave ||
        !isDate(d.sickLeave?.startDate) ||
        !isDate(d.sickLeave.endDate)
      ) {
        throw new Error('Parser Error: invalid occupational healthcare entry');
      }

      return {
        id: d.id,
        type: d.type,
        description: d.description,
        date: d.date,
        specialist: d.specialist,
        diagnosisCodes: d.diagnosisCodes,
        employerName: d.employerName,
        sickLeave: d.sickLeave
      } as OccupationalHealthcareEntry;
    default:
      return assertNever(d);
  }
};

export {
  patientParser,
  entryParser
};