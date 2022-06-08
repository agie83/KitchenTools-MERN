import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsAt, BsLock } from 'react-icons/bs';
import { loginSchema } from '../../utils/validators';
import Input from '../formElements/Input';
import Alert from '../formElements/Alert';
import './account.scss';
import BoxLayout from './BoxLayout';

function Login() {
  const loginFailed = null;
  const errorMessage = null;
  const basicFormData = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(basicFormData);
  const [formError, setFormError] = useState('');

  function handleValidation() {
    const result = loginSchema.validate(formData, { abortEarly: false });
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
    <BoxLayout title="Belépés">
      {(formError !== '' || loginFailed) ? <Alert type="danger" message={(loginFailed) ? errorMessage.message : formError} /> : ''}

      <div>
        <form onSubmit={handleSubmit} noValidate>
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
          <button type="submit" className="btn btn-warning">Belépés</button>
          <div className="mt-3">
            <Link to="/register" className="site-link">Még nincs fiókod? Kattints ide a regisztrációhoz!</Link>
          </div>

        </form>
      </div>
    </BoxLayout>
  );
}

export default Login;
