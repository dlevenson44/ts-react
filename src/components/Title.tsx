import React from 'react';

const Title: React.SFC<{ title: string}> = ({ title }) => (
  <div className="title-container">
    <h4>{title}</h4>
  </div>
);

export default Title;
