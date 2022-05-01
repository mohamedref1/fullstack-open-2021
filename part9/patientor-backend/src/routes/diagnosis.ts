import express, { Router, Request, Response } from 'express';
import { Diagnosis } from '../data/diagnosis.types';
import diagnosesService from '../services/diagnosis';

const router: Router = express.Router();

router.get('/', (_req: Request, res: Response): void => {
  const diagnoses: Diagnosis[] = diagnosesService.getDiagnosis();
  res.json(diagnoses);
});

export default router;