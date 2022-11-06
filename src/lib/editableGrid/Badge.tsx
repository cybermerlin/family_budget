import React from 'react';


interface IProps {
  backgroundColor;
  value;
}


export default function Badge({ value, backgroundColor }: IProps) {
  return (
      <span
          className="font-weight-400 d-inline-block color-grey-800 border-radius-sm text-transform-capitalize"
          style={{
            backgroundColor: backgroundColor,
            padding: '2px 6px'
          }}
      >
      {value}
    </span>
  );
}
