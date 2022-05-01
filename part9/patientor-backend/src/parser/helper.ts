import { IsStringFn, IsDateFn, IsGenderFn, IsValidEntryFn, IsValidEntriesFn } from './helper.types';
import { Entry, Gender } from '../data/patients.types';

const isString: IsStringFn = (value) => {
  return (
    value !== undefined &&
    (
      typeof value === 'string' ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value as any instanceof String
    )
  );
};

const isDate: IsDateFn = (value) => {
  return Boolean(Date.parse(value));
};

const isGender: IsGenderFn = (value) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.values(Gender).includes(value as any);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidEntry: IsValidEntryFn = (value): value is Entry => {
  type KeysOfUnion<T> = T extends T ? keyof T : never;
  type Key = KeysOfUnion<Entry>;
  const keys: Key[] = [
    'type',
    'discharge',
    'id',
    'description',
    'date',
    'specialist',
    'diagnosisCodes',
    'employerName',
    'sickLeave',
    'healthCheckRating'
  ];


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.keys(value).every((k) => keys.includes(k as any));
};

const isValidEntries: IsValidEntriesFn = (value) => {
  if (!(value instanceof Array)) {
    return false;
  }

  return value.every((v) => isValidEntry(v));
};

export {
  isString,
  isDate,
  isGender,
  isValidEntry,
  isValidEntries
};