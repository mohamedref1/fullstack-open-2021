/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entry, Patient } from '../data/patients.types';

export type PatientParserFn =
  (data: any) => Patient;

export type EntryParserFn =
  (data: any) => Entry