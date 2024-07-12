document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('currency-select');
    const rateValueElement = document.getElementById('rate-value');
    const amountInputElement = document.getElementById('amount-input');
    const convertedValueElement = document.getElementById('converted-value');
    const convertButton = document.getElementById('convert-button');

    const fetchRates = (currency) => {
        fetch('/api/rates')
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[currency];
                rateValueElement.textContent = rate ? rate.toFixed(2) : 'N/A';
                updateConvertedValue(rate);
            })
            .catch(error => console.error('Erro ao buscar cotação:', error));
    };

    const updateConvertedValue = (rate) => {
        const amount = parseFloat(amountInputElement.value);
        const convertedValue = rate ? (amount * rate).toFixed(2) : 'N/A';
        convertedValueElement.textContent = convertedValue;
    };

    // Fetch the initial rate for the default selected currency
    fetchRates(selectElement.value);

    // Update the rate and conversion when a new currency is selected
    selectElement.addEventListener('change', () => {
        fetchRates(selectElement.value);
    });

    // Update the conversion when the button is clicked
    convertButton.addEventListener('click', () => {
        const rate = parseFloat(rateValueElement.textContent);
        updateConvertedValue(rate);
    });
});
