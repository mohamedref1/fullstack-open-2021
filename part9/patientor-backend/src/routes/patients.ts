import express, { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { Entry, Patient, ToDisplayPatient } from '../data/patients.types';
import { patientParser, entryParser } from '../parser/patients';
import patientsService from '../services/patients';

const router: Router = express.Router();

router.get('/', (_req: Request, res: Response): void => {
  const patients: ToDisplayPatient[] = patientsService.getToDisplayPatients();
  res.json(patients);
});

router.get('/:id', (req: Request, res: Response): void => {
  const patient: Patient = patientsService.findPatient(req.params.id);
  res.json(patient);
});

router.post('/', (req: Request, res: Response): void => {
  const data = req.body;
  data.id = uuid();
  data.entries = data.entries ? data.entries : [];

  const patient: Patient = patientParser(data);
  const newPatient: ToDisplayPatient = patientsService.addNewPatient(patient);

  res.json(newPatient);
});

router.post('/:id/entries', (req: Request, res: Response): void => {
  const patientId = req.params.id;
  const data = req.body;
  data.id = uuid();

  const entry: Entry = entryParser(data);
  const newEntry: Entry = patientsService.addNewEntry(patientId, entry);

  res.json(newEntry);
});

export default router;