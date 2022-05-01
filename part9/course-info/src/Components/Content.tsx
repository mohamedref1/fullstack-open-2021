import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({courseParts}: ContentProps): JSX.Element => {
  return (
    <div>
      {courseParts
        .map((part, idx) => <Part key={idx} coursePart={part} />)}
    </div>
  );
};

export default Content;