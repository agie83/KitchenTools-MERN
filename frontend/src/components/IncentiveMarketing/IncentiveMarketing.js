import React from 'react';
import { Link } from 'react-router-dom';
import './IncentiveMarketing.scss';

function IncentiveMarketing() {
  return (
    <section className="im-content">
      <div className="row h-100">
        <div className="col-12 col-lg-6 text-uppercase">
          <div className="d-flex flex-column justify-content-center align-items-center text-warning h-100">
            <div className="fs-2">Hosszúhétvége</div>
            <div className="fs-1 fw-bold my-4">akár 30% kedvezmény</div>
            <Link to="/shop" className="btn btn-outline-warning px-3 fs-4">Vásárolj most!</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IncentiveMarketing;
