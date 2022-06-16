import React from 'react';

function Informations() {
  return (
    <section className="container-fluid bg-light p-5">
      <h1 className="h4 mb-5">Fiztetési-és átvételi lehetőségek</h1>
      <h2 className="h5 mb-3">Fizetési módok</h2>
      <p>
        <ul>
          <li>Bankkártyával a helyszínen</li>
          <li>Készpénzzel a helyszínen</li>
          <li>Átutalással</li>
        </ul>
      </p>

      <h2 className="h5 mb-3">Átvételi lehetőségek</h2>
      <p>
        <ul>
          <li>Üzleteinkben</li>
        </ul>
      </p>

    </section>
  );
}

export default Informations;
