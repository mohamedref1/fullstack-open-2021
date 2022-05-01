import React from 'react';
import { CoursePart } from '../types';

interface TotalProps {
  courseParts: CoursePart[];
}

const Content = ({courseParts}: TotalProps): JSX.Element => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((acc, part) => acc + part.exerciseCount, 0)}
    </p>
  );
};

export default Content;