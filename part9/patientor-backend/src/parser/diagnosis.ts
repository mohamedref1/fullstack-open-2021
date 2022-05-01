import { DiagnosisParserFn } from './diagnosis.types';
import { isString } from './helper';

const diagnosisParser: DiagnosisParserFn = (d) => {
  if (!isString(d.code) || d.code === '') {
    throw new Error('Parser Error: missing or invalid diagonse code');
  }

  if (!isString(d.name) || d.name === '') {
    throw new Error('Parser Error: missing or invalid diagonse name');
  }

  if (d.latin !== undefined && (!isString(d.latin) || d.latin === '')) {
    throw new Error('Parser Error: invalid diagonse latin');
  }

  return {
    code: d.code,
    name: d.name,
    latin: d.latin
  };
};

export default diagnosisParser;