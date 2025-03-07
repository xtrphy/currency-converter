import { getCurrencies } from "./api.js";

const data = await getCurrencies();
const exchangeRate = data.conversion_rates;

const input1 = document.querySelector('.currency-input1')
const input2 = document.querySelector('.currency-input2')
const select1 = document.querySelector('.select-currency1');
const select2 = document.querySelector('.select-currency2');

const currencyEqual = document.querySelector('.currency-equal');
const bigCurrency = document.querySelector('.big-currency');

// Default Values Block

input1.value = 1;
input2.value = convertCurrency(input1.value, select1.value, select2.value);

currencyEqual.textContent = `1 ${select1.options[select1.selectedIndex].textContent} равно`
bigCurrency.textContent = `${convertCurrency(1, select1.options[select1.selectedIndex].value, select2.options[select2.selectedIndex].value)} ${select2.options[select2.selectedIndex].textContent}`;

// Default Values Block End

select1.addEventListener('change', () => {
  input2.value = convertCurrency(input1.value, select1.value, select2.value);

  const options = select1.querySelectorAll('option');

  options.forEach(option => {
    option.removeAttribute('selected');
  });

  const selectedOption1 = select1.options[select1.selectedIndex];
  const selectedOption2 = select2.options[select2.selectedIndex];

  selectedOption1.setAttribute('selected', 'selected');

  currencyEqual.textContent = `1 ${selectedOption1.textContent} равно`
  bigCurrency.textContent = `${convertCurrency(1, selectedOption1.value, selectedOption2.value)} ${selectedOption2.textContent}`;
});

select2.addEventListener('change', () => {
  input1.value = convertCurrency(input2.value, select2.value, select1.value);

  const selectedOption1 = select1.options[select1.selectedIndex];
  const selectedOption2 = select2.options[select2.selectedIndex];

  currencyEqual.textContent = `1 ${selectedOption1.textContent} равно`
  bigCurrency.textContent = `${convertCurrency(1, selectedOption1.value, selectedOption2.value)} ${selectedOption2.textContent}`;
});

input1.addEventListener('input', () => {
  input2.value = convertCurrency(input1.value, select1.value, select2.value);
});

input2.addEventListener('input', () => {
  input1.value = convertCurrency(input2.value, select2.value, select1.value);
});

function convertCurrency(amount, fromCurrency, toCurrency) {
  if (!exchangeRate[fromCurrency] || !exchangeRate[toCurrency]) {
    console.error('Ошибка: Валюта не найдена');
  }

  let result = ((amount / exchangeRate[fromCurrency]) * exchangeRate[toCurrency]).toFixed(3);
  return result;
}