import React from 'react';

interface HeaderProps {
  courseName: string;
}

const Header = ({courseName}: HeaderProps): JSX.Element => {
  return (
    <h2>{courseName}</h2>
  );
};

export default Header;