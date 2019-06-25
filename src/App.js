import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import API from './API/fetchCurrenyRates'
import CurrencyCard from './components/currencyCard/currencyCard'

let allowCurrencyList = ['USD', 'CAD', 'IDR', 'GBP', 'CHF', 'SGD', 'INR', 'MYR', 'JPY', 'KRW'];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {rates: {}, showAddMoreInput: false};
        this.payload = {base: 'USD', rates: ['INR'], amount: 1};
        this.getRates = this.getRates.bind(this);
        this.currencyInputRef = React.createRef();
        this.addCurrencyRef = React.createRef();
        this.removeConversion = this.removeConversion.bind(this);
        this.toggleAddCurrencyInput = this.toggleAddCurrencyInput.bind(this);
        this.addCurrency = this.addCurrency.bind(this);
    }

    componentDidMount() {
        this.currencyInputRef.current.value = 1;
        API.fetchCurrencyRates(this.payload).then(
            (response) => {
                return response.json()
            }).then((json) => {
            this.setState({rates: json.rates});
        }).catch(function (err) {
            return err;
        });
    }

    addCurrency() {
        let currencyValue = this.addCurrencyRef.current.value;
        let index = allowCurrencyList.findIndex(currency => currency === currencyValue);
        if (index !== -1) {
            this.payload.rates.push(currencyValue);
            API.fetchCurrencyRates(this.payload).then(
                (response) => {
                    return response.json()
                }).then((json) => {
                if (json.hasOwnProperty('error') && json.error) {
                    alert(json.error)
                }
                this.setState({rates: json.rates, showAddMoreInput: false});
            }).catch(function (err) {
                alert(err);
            });
        } else {
            alert('Please enter a valid currency')
        }

    }

    toggleAddCurrencyInput() {
        this.setState({showAddMoreInput: true})
    }

    removeConversion(key) {
        let rates = Object.assign({}, this.state.rates);
        if (rates[key]) {
            let ratesIndex = this.payload.rates.findIndex(rate => rate === key);
            this.payload.rates.splice(ratesIndex, 1);
            delete rates[key];
            this.setState({rates: rates})
        }

    }

    getRates() {
        let currencyValue = this.currencyInputRef.current.value;
        if (currencyValue) {
            this.payload.amount = currencyValue;
            API.fetchCurrencyRates(this.payload).then(
                (response) => {
                    return response.json()
                }).then((json) => {
                this.setState({rates: json.rates});
            }).catch(function (err) {
                return err;
            });

        } else {
            alert('Please enter a rate');
        }
    }

    render() {
        return (
            <main className='app__container d-flex flex-column m-2'>
                <section className='app__container__exchangeContainer'>
                    <header style={{borderBottom: '1px solid lightgrey'}}>
                        <div className='p-2'>
                            <h6>USD - United State Dollars</h6>
                            <div><input ref={this.currencyInputRef} type='number'/>
                                <button onClick={this.getRates} className='cursor-hand'>Submit</button>
                            </div>
                        </div>
                    </header>
                    <section className='m-2 app__container__cardsContainer'>
                        {Object.keys(this.state.rates).length ? Object.entries(this.state.rates).map(([key, value]) => {
                            return <CurrencyCard base={this.payload.base} amount={this.payload.amount}
                                                 rate={{name: key, value: value}}
                                                 removeConversion={this.removeConversion.bind(null, key)}>
                            </CurrencyCard>
                        }) : <p className='text-center small'>No Data Found</p>
                        }
                    </section>
                    <footer>
                        <section className='d-flex app__container__footer' onClick={this.toggleAddCurrencyInput}>
                            {!this.state.showAddMoreInput ?
                                <p className='cursor-hand'><span>[+]</span> <span>Add More Currencies</span></p> :
                                <div className='m-2'><input ref={this.addCurrencyRef}/>
                                    <button onClick={this.addCurrency} className='cursor-hand'>Submit</button>
                                </div>}
                        </section>
                    </footer>
                </section>
            </main>
        )
    }
}

export default App;
