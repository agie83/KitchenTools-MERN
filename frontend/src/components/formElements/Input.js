import React from 'react';

function Input({
  type,
  label,
  placeholder,
  id,
  name,
  value = '',
  dataTestid,
  onChange,
  icon,
}) {
  return (
    <div className="d-flex flex-row align-items-center mb-4">
      {
        ((label && label !== '') && <label htmlFor={id} className="form-label">{label}</label>)
      }
      {icon}
      <div className="form-outline flex-fill mb-0">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          data-testid={dataTestid}
          placeholder={placeholder}
          className="form-control"
        />
      </div>
    </div>
  );
}

export default Input;
