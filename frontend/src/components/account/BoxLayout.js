import React from 'react';

function BoxLayout({ title, children }) {
  return (
    <section className="login container-fluid my-3">
      <div className="d-flex mx-auto col-12 col-sm-9 col-md-7 col-lg-5 bg-light p-2">
        <div className="border border-warning border-5 p-4 w-100 text-center">
          { (title) && <h1>Belépés</h1>}
          {children}
        </div>
      </div>
    </section>
  );
}

export default BoxLayout;
