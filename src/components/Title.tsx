import React from 'react';

type TitleProps = { title: string }
const Title: React.SFC<TitleProps> = ({ title }) => (
  <div className="title-container">
    <h4>{title}</h4>
  </div>
);

export default Title;
