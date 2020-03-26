import React from 'react';
// import {NavLink} from 'react-router-dom';
import CoinBtns from './Coins/CoinBtns.js';
import { connect } from 'react-redux';

// надо выводить баланс
// и три кнопки с инфой


const Main = (props) => {

    const showTotalChange = () => {
        if (props.totalChangeUSD > 0) {
            return (
                <span className="balance__changes_up">+ ${props.totalChangeUSD.toFixed(2)} <i className="fas fa-long-arrow-alt-up"></i></span>
            )
        } else {
            return (
                <span className="balance__changes_down">- ${-props.totalChangeUSD.toFixed(2)} <i className="fas fa-long-arrow-alt-down"></i></span>
            )
        }
    }
    



    let BTCBalance = 0.2432432;
    let ETHBalance = 2.3242432;
    let XRPBalance = 142.2432432;

    let BTCCost = 1 / props.prices.BTC;
    let ETHCost = 1 / props.prices.ETH;
    let XRPCost = 1 / props.prices.XRP;

    let BTCBalanceUSD = BTCBalance * BTCCost;
    let ETHBalanceUSD = ETHBalance * ETHCost;
    let XRPBalanceUSD = XRPBalance * XRPCost;

    let totalBalance = (BTCBalanceUSD + ETHBalanceUSD + XRPBalanceUSD).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");




    return (
        <div className='block-page-main'>
            <div className='block-page-header'>
                <header className="block-main-header">
                    <div className="search"><a href="#" className="header-icon"><i className="fas fa-search" ></i></a></div>
                    <div className="notice"><a href="#" className="header-icon"><i className="far fa-bell"></i></a></div>
                </header>
                <div className="block-balance">
                    <h2 className="balance__title">Your total balance</h2>
                    <div className="balance__total"><sup className="balance__icon">$</sup>{totalBalance} </div>
                    <div className="balance__change-text">24h Changes</div>
                    {/* тут нужна история */}
                    <div className="balance__changes">{showTotalChange()}</div> 
                </div>
            </div>
            <CoinBtns
                dataPrices = {Object.entries(props.prices)}
                changePrice={props.changePrice}
                place = {'main'}
            />
            
        </div>
    )
}

const mapStateToProps = state => ({
    prices: state.prices
});
const ConnectedMain = connect(mapStateToProps)(Main)
export default ConnectedMain;