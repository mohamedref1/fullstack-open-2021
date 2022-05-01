import React from 'react';
import {Entry as EntryType, Diagnosis} from '../types';

interface EntryProps {
  entry: EntryType;
  diagnosis: {[code: string]: Diagnosis} | null;
  children?: JSX.Element
}

const assertNever = (_value: never): never => {
  throw new Error('invalid entry type');
};

const BasicEntry = ({entry, diagnosis, children}: EntryProps): JSX.Element => {
  return (
    <div key={entry.id}>
      <p><strong>Date: </strong>{entry.date}</p>
      <p><strong>Type: </strong>{entry.type}</p>
      <p><strong>Description: </strong>{entry.description}</p>
      {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0
        ? (
          <>
            <h4>Diagnosis: </h4>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                  {code} {diagnosis && diagnosis[code] ? diagnosis[code].name : null}
              </li>
              ))}
            </ul>
          </>
        )
      : null}
      {children}
      <p><strong>diagnose by: </strong> {entry.specialist}</p>
    </div>
  );
};

const Entry = ({entry, diagnosis}: EntryProps): JSX.Element => {
  switch(entry.type) {
    case 'Hospital':
      return (
        <BasicEntry entry={entry} diagnosis={diagnosis}>
          <p>
            <strong>Discharge: </strong>
            {entry.discharge.date} {entry.discharge.criteria}
          </p>
        </BasicEntry>
      );
    case 'HealthCheck':
      return (
        <BasicEntry entry={entry} diagnosis={diagnosis}>
          <p>
            <strong>Health Check Rate: </strong>
            {entry.healthCheckRating}
          </p>
        </BasicEntry>
      );
    case 'OccupationalHealthcare':
      return (
        <BasicEntry entry={entry} diagnosis={diagnosis}>
          <div>
          <p>
            <strong>Employee Name: </strong>
            {entry.employerName}
          </p>
          <div>
            {entry.sickLeave
              ? (<p>
                  <strong>Sick Leave: </strong> {' '}
                  <u>Start: </u> {entry.sickLeave?.startDate} {' '}
                  <u>End: </u> {entry.sickLeave?.endDate} {' '}
               </p>)
              : null}
          </div>
          </div>
        </BasicEntry>
      );
    default:
      return assertNever(entry);
  }
};

export default Entry;