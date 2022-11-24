import React from 'react';
import './button.css';


interface ButtonProps {
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
}


/**
 * Primary UI component for user interaction
 */
export const Button = ({
                         primary = false,
                         size = 'medium',
                         backgroundColor,
                         label,
                         ...props
                       }: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
      <button
          type="button"
          className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
          style={{ backgroundColor }}
          {...props}
      >
        {label}
      </button>
  );
};
