import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPerson } from 'react-icons/bs';
import Input from '../../formElements/Input';
import { PROFILE_URL } from '../../../constants/url';
import { AuthContext } from '../../../contexts/AuthContext';
import getItems from '../../../utils/queries';
import { profileSchema } from '../../../utils/validators';
import './Profile.scss';
import Alert from '../../formElements/Alert';

function UserData() {
  const basicFormData = {
    firstName: '',
    lastName: '',
  };
  const [formData, setFormData] = useState(basicFormData);
  const [alertMessage, setAlertMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (success) {
        setAlertMessage('');
        setSuccess(false);
        navigate('/profile');
      }
    }, 3000);
  }, [success]);

  useEffect(() => {
    getItems(PROFILE_URL, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((data) => {
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
      });
    });
  }, []);
  const handleOnChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValidation = () => {
    const result = profileSchema.validate(formData, { abortEarly: false });
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
          setAlertMessage(
            {
              type: 'success',
              message: 'Sikeres adatmódosítás.',
            },
          );
          setSuccess(true);
        }
      });
    }
  };
  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
            Adatmódosítás
          </button>
        </h2>
        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
          <div className="accordion-body">
            {(alertMessage !== '') && <Alert type={alertMessage.type} message={alertMessage.message} />}
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
              <div className="text-end">
                <button type="submit" className="btn btn-outline-warning">Adatok mentése</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserData;
