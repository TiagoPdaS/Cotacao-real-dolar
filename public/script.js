document.addEventListener('DOMContentLoaded', function () {
    const currencySelect = document.getElementById('currency-select');
    const amountInput = document.getElementById('amount-input');
    const convertButton = document.getElementById('convert-button');
    const convertedValuesList = document.getElementById('converted-values');

    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/BRL';

    async function getRates() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            return data.rates;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            alert('Erro ao buscar as taxas de câmbio. Por favor, tente novamente mais tarde.');
            return null;
        }
    }

    async function convertCurrency() {
        const selectedCurrency = currencySelect.value;
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            alert('Por favor, insira um valor válido.');
            return;
        }
        const rates = await getRates();
        if (!rates) {
            return;
        }

        const otherCurrencies = ['USD', 'CAD', 'EUR', 'BRL'].filter(currency => currency !== selectedCurrency);

        const flags = {
            USD: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
            CAD: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg',
            EUR: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg',
            BRL: 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg'
        };

        convertedValuesList.innerHTML = '';
        otherCurrencies.forEach(currency => {
            const listItem = document.createElement('li');
            const flagImg = document.createElement('img');
            flagImg.src = flags[currency];
            flagImg.alt = `${currency} flag`;
            flagImg.classList.add('flag-icon');
            listItem.appendChild(flagImg);
            listItem.append(` ${(amount / rates[selectedCurrency] * rates[currency]).toFixed(2)} ${currency}`);
            convertedValuesList.appendChild(listItem);
        });
    }

    convertButton.addEventListener('click', convertCurrency);
});
