import React from 'react';
import './IncentiveMarketing.scss';

function IncentiveMarketing() {
  return (
    <section className="im-content">
      <div className="row h-100">
        <div className="col-12 col-lg-6 text-uppercase">
          <div className="d-flex flex-column justify-content-center align-items-center text-warning h-100">
            <div className="fs-2">Long weekend</div>
            <div className="fs-1 fw-bold my-4">get discount Up to 30%</div>
            <button type="button" className="btn btn-outline-warning px-3 fs-4">Shop now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IncentiveMarketing;
