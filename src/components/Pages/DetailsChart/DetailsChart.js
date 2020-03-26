import React, { useEffect, useState, PureComponent } from 'react';
import axios from 'axios';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, ReferenceArea, ResponsiveContainer
    } from 'recharts';

const DetailsChart =(props) => {
    const [datacurrentPrice, updatedatacurrentPrice] = useState(null);

    console.log("произошло обновление")
 
    useEffect ( () => { // запрос данных при рендеринге, заброс их в стейт
        let requestUrl = `https://min-api.cryptocompare.com/data/v2/histo${props.infoChart.time}?fsym=${props.coinName[0]}&tsym=USD&limit=${props.infoChart.limit}`;
        // const requestUrl = `https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=30`;
        console.log(requestUrl);
        console.log("произошло обновление данных");
        // тут можно задать интервал для автоматического обновления информации о цене
        // setInterval(
            (async () => {
            await axios.get(requestUrl)
            .then(response => {
                updatedatacurrentPrice(response.data.Data.Data) 
            });

        })();
        // ,2000)
    },[props.infoChart]);


    if (datacurrentPrice) {

        const addZeroToData = (num) => {
            if (num <= 9) num = '0' + num;
            return num; 
        }
        const timeConverter = (UNIX_timestamp) => {
            var a = new Date(UNIX_timestamp * 1000);
            if (props.infoChart.time == 'day'){
            
                var month = addZeroToData(a.getMonth());
                var date = addZeroToData(a.getDate());
                var time = date + '.' + month;
            } else {
                var hour = addZeroToData(a.getHours()); 
                var min = addZeroToData(a.getMinutes());
                var time = hour + 'h' + min;
            }
            return time;
        }


        let maxPrice=0;
        let newdata = [...datacurrentPrice]
        newdata.map( (item,index) =>{
            newdata[index].time = timeConverter(item.time); 
            newdata[index].close = item.close; 
            if (item.close> maxPrice) {
                maxPrice = item.close
            }
        })
        console.log(maxPrice)

        let points = [0];
        const makePoints = (num) => { 
            let stepInterval=0;
            let step =0;
            if (num > 0.5) {

                let num1 = Math.trunc(num) 
                let firstOfNum = +(''+num1)[0]

                if (firstOfNum > 3) {
                    console.log('asd2');
                    step = 1; 
                } else  if (firstOfNum > 1) {
                    console.log('asd1');
                    step = 0.5; 
                } else {
                    step = 0.25;
                }
                for (let i = 1; i < num1.toString().length; i++){ // умножаю step на 10 столько раз сколько цифр получаю 10/100/1000
                    step = step * 10
                }
                for (let i = 1; stepInterval <= num; i++){
                    stepInterval = step * i;
                    
                    points.push(stepInterval);
                }
                console.log(points);
            } else {
                for (let i = 0; i < 6 ; i++){
                    
                    points.push(i/10);
                }
            }
        }
        makePoints(maxPrice)



    

        return (
            <div className="information">
            <ResponsiveContainer width="100%" height={470}>
                <AreaChart
                    data={newdata}
                    
                    // margin={{
                    //     left: -50
                    // }}
                >
                    <CartesianGrid   vertical={false} strokeWidth={0.1}/>

                    <XAxis dataKey="time" tick={{fontSize: 10}} interval={props.infoChart.interval} stroke="#fff"/>
                    <YAxis type="number" stroke="#fff" width={1} tick={{fontSize: 10}}  ticks={points} unit='$'/> 
                    <ReferenceArea/>
                    <defs>
                        <linearGradient id="linear-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgba(149, 108, 236, 0.2)"/>
                            <stop offset="100%" stopColor="rgba(149, 108, 236, 0.01)"/>
                        </linearGradient>
                    </defs>
                    <Area dataKey="close" stroke="#956cec" fill="url(#linear-gradient)" strokeWidth={2}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
        
        )
    }  else {return ( <h2>PLEASE, WAIT</h2> )}; 
}
export default DetailsChart;




    