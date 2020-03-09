import React from 'react';

type ButtonProps = { title: string, clicker: any }
const Button:React.SFC<ButtonProps> = ({ title, clicker}) => (
  <div className="buttonContainer">
    <button onClick={clicker}>
      {title}
    </button>
  </div>
);

export default Button;
