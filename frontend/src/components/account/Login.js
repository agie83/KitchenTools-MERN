import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsAt, BsLock } from 'react-icons/bs';
import { loginSchema } from '../../utils/validators';
import Input from '../formElements/Input';
import Alert from '../formElements/Alert';
import './account.scss';
import BoxLayout from '../BoxLayout';
import { AuthContext, loginUser } from '../../contexts/AuthContext';

function Login() {
  const basicFormData = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(basicFormData);
  const [formError, setFormError] = useState('');
  const {
    errorMessage, loading, dispatch, user,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const navigatePath = (urlSearchParams.get('to')) ? urlSearchParams.get('to') : '/shop';

  useEffect(() => {
    if (user) {
      setFormError('');
      setFormData(basicFormData);
      navigate(navigatePath);
    }
  }, [user]);

  useEffect(() => {
    setFormError('');
    if (errorMessage) setFormError(errorMessage.message.split(','));
  }, [errorMessage]);

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
      await loginUser(dispatch, formData);
    }
  };
  return (
    <BoxLayout title="Belépés">
      {(formError !== '') && <Alert type="danger" message={formError} />}
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
          <button type="submit" disabled={loading} className="btn btn-warning">Belépés</button>
          <div className="mt-3">
            <Link to="/register" className="site-link">Még nincs fiókod? Kattints ide a regisztrációhoz!</Link>
          </div>

        </form>
      </div>
    </BoxLayout>
  );
}

export default Login;
