import React, { useState } from 'react';
import {
  BsAt, BsPerson, BsLock, BsShieldLock,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { registerSchema } from '../../utils/validators';
import Input from '../formElements/Input';
import Alert from '../formElements/Alert';
import BoxLayout from './BoxLayout';

function Register() {
  const registerFailed = null;
  const errorMessage = null;
  const basicFormData = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(basicFormData);
  const [formError, setFormError] = useState('');

  function handleValidation() {
    const result = registerSchema.validate(formData, { abortEarly: false });
    const { error } = result;
    if (error) {
      const errorArray = result.error.message.split('.');
      setFormError(errorArray);
      return false;
    }
    return true;
  }

  const handleOnChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const formElement = e.target;
    }
  };
  return (
    <BoxLayout title="Regisztráció">
      {(formError !== '' || registerFailed) ? <Alert type="danger" message={(registerFailed) ? errorMessage.message : formError} /> : ''}

      <div>
        <form onSubmit={handleSubmit} noValidate>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Vezetéknév*"
            onChange={handleOnChange}
            value={formData.lastName}
            icon={<BsPerson className="fs-4 me-1" />}
          />
          <Input
            type="text"
            name="firstName"
            id="firsName"
            placeholder="Keresztnév*"
            onChange={handleOnChange}
            value={formData.firstName}
            icon={<BsPerson className="fs-4 me-1" />}
          />
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email*"
            onChange={handleOnChange}
            value={formData.email}
            icon={<BsAt className="fs-4 me-1" />}
          />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Jelszó*"
            onChange={handleOnChange}
            value={formData.password}
            icon={<BsLock className="fs-4 me-1" />}
          />
          <Input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="Jelszó megadása újból*"
            onChange={handleOnChange}
            value={formData.passwordConfirmation}
            icon={<BsShieldLock className="fs-4 me-1" />}
          />
          <button type="submit" className="btn btn-warning">Regisztrálok</button>
          <div className="mt-3">
            <Link to="/login" className="site-link">Már van fiókod? Kattints ide a belépéshez!</Link>
          </div>
        </form>
      </div>
    </BoxLayout>
  );
}

export default Register;
