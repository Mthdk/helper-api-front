// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('conversion-form');
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const resultText = document.getElementById('result-text');

    const convertCurrency = async (amount, from, to) => {
        try {
            const response = await fetch(`https://economia.awesomeapi.com.br/json/daily/${from}-${to}`);
            const data = await response.json();
            const rate = data[0].ask;
            const convertedAmount = (amount * rate).toFixed(2);
            return convertedAmount;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (!amount ||!fromCurrency ||!toCurrency) {
            alert('Please fill in all fields');
            return;
        }

        const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);

        if (convertedAmount === null) {
            alert('An error occurred while converting currencies');
            return;
        }

        resultText.textContent = `Result: ${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    });
});