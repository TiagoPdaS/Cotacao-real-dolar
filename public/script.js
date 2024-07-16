document.addEventListener('DOMContentLoaded', function () {
    const currencySelect = document.getElementById('currency-select');
    const amountInput = document.getElementById('amount-input');
    const convertButton = document.getElementById('convert-button');
    const rateValue = document.getElementById('rate-value');
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

        convertedValuesList.innerHTML = '';
        otherCurrencies.forEach(currency => {
            const listItem = document.createElement('li');
            listItem.textContent = `${(amount / rates[selectedCurrency] * rates[currency]).toFixed(2)} ${currency}`;
            convertedValuesList.appendChild(listItem);
        });

        if (selectedCurrency === 'BRL') {
            rateValue.textContent = `Valor em Real Brasileiro (BRL): ${amount.toFixed(2)}`;
        } else {
            rateValue.textContent = `Valor em ${selectedCurrency}: ${(amount / rates[selectedCurrency]).toFixed(2)}`;
        }
    }

    convertButton.addEventListener('click', convertCurrency);
});
