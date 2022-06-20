const products = [{
  _id: {
    $oid: '628a63d71c406644488d2233',
  },
  name: 'Teflonos serpenyő',
  images: [
    'pan1.jpg',
  ],
  category: {
    $oid: '6257326ca4457444b2e75620',
  },
  description: 'teflonos serpenyő...',
  labels: [
    'rozsdamentes acél',
  ],
  price: {
    $numberDecimal: '4000',
  },
  slug: 'teflonos-serpenyo',
  qty: {
    $numberDecimal: '10',
  },
}, {
  _id: {
    $oid: '628a63d71c404443c88d2244',
  },
  name: 'Rozsdamentes fazék 11cm',
  images: [
    'pot1.jpg',
  ],
  category: {
    $oid: '6257326ca4457e2db2e75620',
  },
  description: 'lorem ipsum...',
  labels: [
    'rozsdamentes acél',
  ],
  price: {
    $numberDecimal: '6000',
  },
  slug: 'rozsdamentes-fazek-11cm',
  qty: {
    $numberDecimal: '8',
  },
}, {
  _id: {
    $oid: '628a63d71c404443c88d2255',
  },
  name: 'Rozsdamentes fazék 19cm',
  images: [
    'pot1.jpg',
  ],
  category: {
    $oid: '6257326ca4457e2db2e75620',
  },
  description: 'fazék...',
  labels: [
    'rozsdamentes acél',
  ],
  price: {
    $numberDecimal: '6000',
  },
  slug: 'rozsdamentes-fazek-19cm',
  qty: {
    $numberDecimal: '12',
  },
},

{
  _id: {
    $oid: '628a63d71c444403c88d2885',
  },
  name: 'Evőeszköz készlet',
  images: [
    'evoeszkozok_zbfuje.jpg',
  ],
  category: {
    $oid: '6257326ca4457e2db2e75621',
  },
  description: 'fazék...',
  labels: [
    'evőeszköz, kanál, kés, villa',
  ],
  price: {
    $numberDecimal: '6000',
  },
  slug: 'evoeszkoz-keszlet',
  qty: {
    $numberDecimal: '12',
  },
},
{
  _id: {
    $oid: '628a63d71c444403c88d2257',
  },
  name: 'Tányér készlet',
  images: [
    'tanyerok_ymshh7.jpg',
  ],
  category: {
    $oid: '6257326ca4457e2db2e75620',
  },
  description: 'teljes étkészlet',
  labels: [
    'porcelán',
  ],
  price: {
    $numberDecimal: '6000',
  },
  slug: 'tanyer-keszlet',
  qty: {
    $numberDecimal: '12',
  },
}];

export default products;
