import React from 'react';

interface IFormFieldProps extends React.HTMLProps<HTMLInputElement> {
  name?: string,
  error?: string,
  label: string,
}

const FormField = ({name, label, error, ...props} : IFormFieldProps) => {
  return (
    <div className='form-field'>
      <label className={'form-label'} htmlFor={name ?? label}>{label}</label>
      <input className={'form-input'} id={name ?? label} {...props} />
      <p role="alert" className='form-error'>{error}</p>
    </div>
  );
};

export default FormField;

