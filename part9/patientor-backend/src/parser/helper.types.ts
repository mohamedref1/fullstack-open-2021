/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entry } from '../data/patients.types';

export type IsStringFn =
  (value: any) => boolean;

export type IsDateFn =
  (value: any) => boolean;

export type IsGenderFn =
  (value: any) => boolean;

export type IsValidEntriesFn =
  (value: any) => boolean;

export type IsValidEntryFn =
  (value: any) => value is Entry;
