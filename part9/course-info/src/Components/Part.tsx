import React from 'react';
import { CoursePart } from '../types';

interface ContentProps {
  coursePart: CoursePart;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const assertNever = (_value: never): never => {
  throw new Error('invalid course type');
};

const Part = ({coursePart}: ContentProps): JSX.Element => {  
  switch(coursePart.type) {
  case 'normal':
    return (
      <div>
        <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
        {coursePart.description ? <p><i>{coursePart.description}</i></p> : null}
      </div>
    );
  case 'groupProject':
    return (
      <div>
        <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
        {coursePart.description ? <p><i>{coursePart.description}</i></p> : null}
        <p>project exercises: {coursePart.groupProjectCount}</p>
      </div>
    );
  case 'submission':
    return (
      <div>
        <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
        {coursePart.description ? <p><i>{coursePart.description}</i></p> : null}
        <p>submit to: {coursePart.exerciseSubmissionLink}</p>
      </div>
    );
  case 'special':
    return (
      <div>
        <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
        {coursePart.description ? <p><i>{coursePart.description}</i></p> : null}
        <p>required skills: {coursePart.requirements.toString()}</p>
      </div>
    );

  default:
    return assertNever(coursePart);
  }
};

export default Part;