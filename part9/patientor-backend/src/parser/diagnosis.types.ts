/* eslint-disable @typescript-eslint/no-explicit-any */
import { Diagnosis } from '../data/diagnosis.types';

export type DiagnosisParserFn =
  (data: any) => Diagnosis;