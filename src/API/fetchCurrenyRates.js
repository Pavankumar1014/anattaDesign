const API = {
    fetchCurrencyRates: function (payload) {
        return fetch(`https://api.exchangeratesapi.io/latest?base=${payload.base}&symbols=${payload.rates.join(',')}`, {
            method: 'GET',
            credentials: 'same-origin'
        })
    }
}

export default API;