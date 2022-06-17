import React, { useEffect, useState } from 'react';
import {
  BsAt, BsPerson, BsLock, BsShieldLock,
} from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema } from '../../utils/validators';
import Input from '../formElements/Input';
import Alert from '../formElements/Alert';
import BoxLayout from '../BoxLayout';
import { REGISTER_URL } from '../../constants/url';

function Register() {
  const basicFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordAgain: '',
  };
  const [formData, setFormData] = useState(basicFormData);
  const [alertMessage, setAlertMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (success) {
        setAlertMessage('');
        navigate('/login');
      }
    }, 3000);
  }, [success]);
  function handleValidation() {
    const result = registerSchema.validate(formData, { abortEarly: false });
    const { error } = result;
    if (error) {
      const errorArray = result.error.message.split('.');
      setAlertMessage(
        {
          type: 'danger',
          message: errorArray,
        },
      );
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
      let response;
      try {
        response = await fetch(REGISTER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const { message = 'Server error' } = await response.json();

        if (response.status >= 200 && response.status < 300) {
          setFormData(basicFormData);
          setAlertMessage(
            {
              type: 'success',
              message: 'Sikeres regisztráció, most átirányítunk a belépési oldalra.',
            },
          );
          setSuccess(true);
          formElement.reset();
        }
        if (response.status === 400) {
          setAlertMessage(
            {
              type: 'danger',
              message: message.split(','),
            },
          );
        }
        if (response.status === 500) {
          setAlertMessage(
            {
              type: 'danger',
              message: 'Hiba történt, kérjük, próbáld újra később!',
            },
          );
        }
      } catch (error) {
        setAlertMessage(
          {
            type: 'danger',
            message: 'Hiba történt, kérjük, próbáld újra később!',
          },
        );
        throw new Error(error);
      }
    }
  };
  return (
    <BoxLayout title="Regisztráció">

      {(alertMessage !== '') && <Alert type={alertMessage.type} message={alertMessage.message} />}
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
            name="passwordAgain"
            id="passwordAgain"
            placeholder="Jelszó megadása újból*"
            onChange={handleOnChange}
            value={formData.passwordAgain}
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
