import { ExcercisesParserResult } from '../types/exercise';

const parseNumber = (value: unknown): number => {
  if (value === undefined || isNaN(Number(value))) {
    throw new Error('malformed parameter');
  }

  return Number(value);
};

const parseListOfNumbers = (value: unknown): number[] => {
  if (!value || !(value instanceof Array)) {
    throw new Error('malformed parameter');
  }

  return value.map((v) => parseNumber(v));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const excercisesBodyParser = (body: any): ExcercisesParserResult => {
  return {
    target: parseNumber(body.target),
    dailyExcercisesHours: parseListOfNumbers(body.daily_exercises)
  };
};

export const excercisesCliParser = (): ExcercisesParserResult => {
  const target = Number(process.argv[2]);
  const dailyExcercisesHours =
    process.argv
      .slice(3, process.argv.length)
      .map((s) => Number(s));

  if (process.argv.length < 4) {
    throw new Error('Error: your command must have at least 2 arguments');
  }

  dailyExcercisesHours.forEach((d) => {
    if (isNaN(d)) {
      throw new Error('Error: all arguments must be numbers');
    }
  });

  return {
    target,
    dailyExcercisesHours
  };
};