import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Main from './Pages/Main.js'
import Details from './Pages/Details.js'
import { getPricesSuccess, getPricesFail } from '../redux/actions';
import { connect } from 'react-redux';

// основа - получаю данные, отправляю в редакс
// настраиваю роуты -главная или детали (3 штуки)

const App = ({onSuccess, onFail}) => {
    const [dataPrice, updateDataPrice] = useState(null);
    const [price24hour, updateprice24hour] = useState(null);


    useEffect ( () => {
        const requestUrl = 'https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH,XRP';
        const getBtcUrl = ['https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=24','https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=24','https://min-api.cryptocompare.com/data/v2/histohour?fsym=XRP&tsym=USD&limit=24']; 

        // тут можно задать интервал для автоматического обновления информации о цене
        // setInterval(
            (async () => {
                await axios.get(requestUrl)
                .then(response => {
                    updateDataPrice(Object.entries(response.data)) 
                    onSuccess(response.data)
                });
                let priceCoin24hour =[];
                for (const item of getBtcUrl) {
                    await axios.get(item)
                    .then(response => {
                        console.log(response.data.Data.Data[0].close)
                        priceCoin24hour.push(response.data.Data.Data[0].close)
                });
                }
                updateprice24hour(priceCoin24hour)


            })();
        // ,2000)
    },[onSuccess]);

    if (price24hour && dataPrice) { // рендер при получении всех данных

        let changePrice =[] // заношу проценты изменений
        let totalChangeUSD = 0;
        dataPrice.forEach((item, index) => {
            console.log(1/item[1]);
            console.log(1/item[1]);
        })

        dataPrice.forEach((item, index) => {
            changePrice.push( ((1/item[1] - price24hour[index]) / price24hour[index] * 100).toFixed(2) ); // закидываю проценты по всем коинам
            totalChangeUSD += (1/item[1] - price24hour[index]); // изменение в долларах по всем в сумме
        })
        console.log(changePrice)
        console.log(totalChangeUSD)






        const createRoute = () =>{
        return dataPrice && dataPrice.filter( (item, index) => index <= dataPrice.length ).map ((item, index) => (
            <Route
                key = {index}
                path={'/coin'+ (index + 1)}
                // exact
                component = {() => <Details coinId={index} coinName={item} price24={price24hour} changePrice={changePrice} /> }
            />
            ))
        }

        return(
            <section className="block-main">
                <div className="block-wrapper">
                    <Route
                        path='/'
                        exact
                        component = {() => <Main changePrice={changePrice} totalChangeUSD={totalChangeUSD}/>}
                    />
                    {createRoute()}
                </div>
            </section>
        ) 
    } { return ( <h2 className="warning">Please, wait</h2>) }














    
}

const mapDispatchToProps = dispatch => ({
   onSuccess: data => dispatch(getPricesSuccess(data)),  
   onFail: () => dispatch(getPricesFail)
});
const ConnectedApp = connect(null, mapDispatchToProps)(App)

export default ConnectedApp;