import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsLock, BsShieldLock } from 'react-icons/bs';
import Input from '../../formElements/Input';
import { PROFILE_URL } from '../../../constants/url';
import { AuthContext } from '../../../contexts/AuthContext';
import getItems from '../../../utils/queries';
import { passwordSchema } from '../../../utils/validators';
import './Profile.scss';
import Alert from '../../formElements/Alert';

function UserData() {
  const basicFormData = {
    password: '',
    passwordAgain: '',
  };
  const [formData, setFormData] = useState(basicFormData);
  const [disabled, setDisabled] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (success) {
        setAlertMessage('');
        navigate('/profile');
      }
    }, 5000);
  }, [success]);

  useEffect(() => {
    getItems(PROFILE_URL, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }, []);

  useEffect(() => {
    if (formData.password !== '' && formData.passwordAgain !== '') { setDisabled(false); } else { setDisabled(true); }
  }, [formData]);

  const handleOnChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValidation = () => {
    const result = passwordSchema.validate(formData, { abortEarly: false });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formElement = e.target;
    if (handleValidation()) {
      getItems(PROFILE_URL, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((data) => {
        if (data.message) {
          setAlertMessage(
            {
              type: 'danger',
              message: data.message,
            },
          );
        } else {
          setFormData(basicFormData);
          setAlertMessage(
            {
              type: 'success',
              message: 'Sikeres jelszómódosítás.',
            },
          );
          setSuccess(true);
          formElement.reset();
        }
      });
    }
  };
  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne-pwd" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne-pwd">
            Jelszómódosítás
          </button>
        </h2>
        <div id="panelsStayOpen-collapseOne-pwd" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
          <div className="accordion-body">
            {(alertMessage !== '') && <Alert type={alertMessage.type} message={alertMessage.message} />}
            <form onSubmit={handleSubmit} noValidate>
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
              <div className="text-end">
                <button type="submit" disabled={disabled} className="btn btn-outline-warning">Jelszó mentése</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserData;
