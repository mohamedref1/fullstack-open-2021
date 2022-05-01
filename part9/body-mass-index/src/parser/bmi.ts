import { BmiParserResult } from '../types/bmi';

const isStringNumber = (value: unknown): value is string => {
  return !isNaN(Number(value));
};

const parseParam = (value: unknown): number => {
  if (value === undefined || !isStringNumber(value)) {
    throw new Error('malformed parameters');
  }

  return Number(value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bmiQueryParser = (query: any): BmiParserResult => {
  return {
    height: parseParam(query.height),
    width: parseParam(query.width),
  };
};

export const bmiCliParser = (): BmiParserResult => {
  const height = Number(process.argv[2]);
  const width = Number(process.argv[3]);

  if (process.argv.length !== 4) {
    throw new Error('Error: your command must be: node path arg1 arg2');
  }

  if (isNaN(height) || isNaN(width)) {
    throw new Error('Error: both height and width must be numbers');
  }

  return {
    height,
    width
  };
};

