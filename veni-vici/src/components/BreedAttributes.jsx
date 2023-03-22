import React, { useState } from 'react';
import AttributeButton from './AttributeButton';

const BreedAttributes = ({ attributes, onAttributeSelect }) => {
  const [selectedAttribute, setSelectedAttribute] = useState('');

  const handleAttributeClick = (attribute) => {
    setSelectedAttribute(attribute);
    onAttributeSelect(attribute);
  };

  return (
    <div>
      <h2>Attributes:</h2>
      {attributes.map((attribute, index) => (
        <AttributeButton
          key={index}
          attribute={attribute}
          onClick={() => handleAttributeClick(attribute)}
        />
      ))}
    </div>
  );
};

export default BreedAttributes;
