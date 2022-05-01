import { GetDiagnosisFn } from './diagnosis.types';
import diagnosis from '../data/diagnosis';

const getDiagnosis: GetDiagnosisFn = () => {
  return diagnosis;
};

export default {
  getDiagnosis
};