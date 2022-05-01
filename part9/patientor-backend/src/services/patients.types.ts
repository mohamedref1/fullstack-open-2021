import { Entry, Patient, ToDisplayPatient } from '../data/patients.types';

export type GetPatientFn =
  () => Patient[];

export type GetToDisplayPatientFn =
  () => ToDisplayPatient[];

export type FindPatientFn =
  (id: string) => Patient

export type AddNewPatientFn =
  (patient: Patient) => ToDisplayPatient;

export type AddNewEntryFn =
  (id: string, entry: Entry) => Entry