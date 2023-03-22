import React from 'react';

const AttributeButton = ({ attribute, onClick }) => (
  <button onClick={onClick}>{attribute}</button>
);

export default AttributeButton;