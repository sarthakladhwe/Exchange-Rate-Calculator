const currency_one = document.getElementById('currency-one');
const amount_one = document.getElementById('amount-one');
const currency_two = document.getElementById('currency-two');
const amount_two = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates API and update the DOM

/*fetch(`https://open.exchangerate-api.com/v6/latest`)
    .then(res => res.json())
    .then(data => {
        const currencies = data.rates;
        console.log(currencies);

    })
*/
function calculate() {
    const currency_one_value = currency_one.value;
    const currency_two_value = currency_two.value;

    fetch(`https://open.exchangerate-api.com/v6/latest/${currency_one_value}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            const rate_data = data.rates[currency_two_value];
            rate.innerHTML = `1 ${currency_one_value} = ${rate_data} ${currency_two_value}`;

            amount_two.value = (amount_one.value * rate_data).toFixed(2); 
        });
}

// Event Listeners

currency_one.addEventListener('change', calculate);
amount_one.addEventListener('input', calculate);
currency_two.addEventListener('change', calculate);
amount_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculate();
})

calculate();