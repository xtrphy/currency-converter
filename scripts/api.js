export async function getCurrencies() {
  try {
    const response = await fetch('https://v6.exchangerate-api.com/v6/5983d4c0172af0dc6d94125f/latest/USD');
    return await response.json();
  } catch (error) {
    console.error('Error while fetching data', error);
    return null;
  }
}