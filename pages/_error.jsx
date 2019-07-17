import React from 'react';

export default props => {
  const errors = Object.values(props)
    .map(val => val.toString())
    .join('\n');

  return <div>{errors}</div>;
};
