export default async function getItems(url, settings = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}) {
  let response;
  try {
    response = await fetch(url, settings);
  } catch (error) {
    throw new Error(error.message || 'Database error');
  }
  return response.json();
}
