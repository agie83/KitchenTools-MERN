import React from 'react';
import { TbZoomExclamation } from 'react-icons/tb';
import BoxLayout from '../BoxLayout';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <BoxLayout title="404" titleClass="page404-title">
      <TbZoomExclamation className="not-found-icon" />
      <p className="p-3 fs-4">A keresett oldal nem található</p>
    </BoxLayout>

  );
};

export default NotFoundPage;
