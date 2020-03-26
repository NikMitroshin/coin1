import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import CoinBtns from './Coins/CoinBtns.js';
import {NavLink} from 'react-router-dom';

import DetailsChart from './DetailsChart/DetailsChart.js';

const Details = (props) => {
    console.log(props.price24) // цены 24 часа назад


    const names = ['Bitcoin', 'Ethereum', 'Ripple']; //тут имена (по идее с сервера)
    const balance = [0.21234243, 2.3222343, 156.3424232]; //тут кол-во (по идее с сервера)
    const icons = ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png', 'https://d2a4hncphh3gxw.cloudfront.net/image/artwork/86852/39/92/39920819aaeb27ff97ffcae80432e230_86852'];

    // if (props.prices && props.price24){


        const infoToChartHour = {
            type: 'day',
            time: 'hour',
            limit: 8,
            interval: 0
        }
        const infoToChartDay = {
            type: 'week',
            time: 'day',
            limit: 8,
            interval: 0
        }
        const infoToChartMonth = {
            type: 'month',
            time: 'day',
            limit: 32,
            interval: 3
        }
        const [infoToChart, updateinfoToChart] = useState(infoToChartHour);

        const dataDetais = Object.entries(props.prices)

     

        console.log(props.coinId) // получаю значение текущего коина
        console.log(props.coinName[0]) // получаю имя коина и меняю запрос, получая нужную инфу


        const showChange = (change) => {
            if (change > 0) {
                return (
                    <span className="balance__changes_up">+ {props.changePrice[props.coinId]} %</span>
                )
            } else {
                return (
                    <span className="balance__changes_down">- {-props.changePrice[props.coinId]} %</span>
                )
            }
        }






        return (
            <div className='block-page-details'>
                <div className='block-page-header'>
                    <header className="block-details-header">
                        <NavLink to='/' className="details-back"><i className="fas fa-arrow-left"></i></NavLink>
                    </header>
                    <div className="box-slide">
                        <CoinBtns
                        dataPrices = {dataDetais}
                        changePrice ={props.changePrice}
                        place = {'details'}
                        />
                    </div>
                    <div className="details-coin">
                        <div className="coin-icon"><img src={icons[props.coinId]} alt="" height='30px'/></div>
                        <div className="coin-name">
                            <p className="details-coin-name__abbr">{Object.keys(props.prices)[props.coinId]}</p>
                            <p className="details-coin-name__full">{names[props.coinId]}</p>
                        </div>
                        <div className="coin-total">
                            <div className="details-coin-total__quantity">{balance[props.coinId]}</div>
                            <div className="details-info-changes__percent">{showChange(props.changePrice[props.coinId])}</div>
                        </div>
                    </div>
                    <div className="box-time-btns">
                        <button className={ (infoToChart.type == infoToChartHour.type) ? 'time-btn time-btn-active' : 'time-btn'} onClick={()=> updateinfoToChart(infoToChartHour)}>Day</button>
                        <button className={ (infoToChart.type == infoToChartDay.type) ? 'time-btn time-btn-active' : 'time-btn'} onClick={()=> updateinfoToChart(infoToChartDay)}>Week</button>
                        <button className={ (infoToChart.type == infoToChartMonth.type) ? 'time-btn time-btn-active' : 'time-btn'} onClick={()=> updateinfoToChart(infoToChartMonth)}>Month</button>
                    </div>
                </div>
                
                <DetailsChart
                    coinName = {props.coinName}
                    infoChart = {infoToChart}
                />
                <div className="information123">

                </div>
            </div>
        )

           
    // } else { return ( <h2>Please, wait</h2>) }
}


const mapStateToProps = state => ({
    prices: state.prices
});
const ConnectedDetails = connect(mapStateToProps)(Details)

export default ConnectedDetails;