import React, {Component} from 'react';
import './currencyCard.css';

class CurrencyCard extends Component {
    constructor(props) {
        super(props);
        this.removeConversion = this.removeConversion.bind(this);
    }

    removeConversion() {
        if (typeof this.props.removeConversion === 'function') {
            this.props.removeConversion()
        }
    }

    render() {
        const {rate, base, amount} = this.props;
        const total = rate && rate.value * amount;
        return (
            <section className='currencyCard__container d-flex flex-row mb-2'>
                <section className='d-flex flex-column currencyCard__container__section p-1'>
                    <div className='d-flex flex-row justify-content-between'>
                        <span>{rate.name}</span>
                        <span>{total}</span>
                    </div>
                    <div>
                        <span className='small'>{amount}{base} = {total} {rate.name}</span>
                    </div>
                </section>
                <section className='text-center p-2 cursor-hand'>
                    <span title='Remove' onClick={this.removeConversion} >[-]</span>
                </section>
            </section>
        )
    }
}

export default CurrencyCard;