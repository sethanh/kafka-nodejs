import React, { useState, useEffect,useMemmo } from 'react';
import './App.css';
import notiIcon from './notification.png';
import userIcon from './user.png';
import goldIcon from './gold.png';

function HeadNotification({ facts, user }) {
    const [count, setCount] = useState(0);
    const [factsObject, setFactsObject] = useState([]);

    useEffect(() => {
        let length = facts.length;
        setCount(length);

        var data = [];
        for(let i = 0; i< length; i++)
        {
            data.push(JSON.parse(facts[i])[0])
        }
        setFactsObject(data);
    }, [facts]);

    const formatMoney = (number) => {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'VND' });
    }

    const totalUsed = (data)=>{
        let sum = 0;
        factsObject.forEach(element => {
            var ivdt = element?.InvoiceDetails||[];
            ivdt.forEach(e =>{
                console.log(element,e);
                sum = sum + (e?.Product?.price||0);
            })
        });

        return sum;
    }

    return (
        <div className='headNotification'>
            {user &&
                <div className='tab'>
                    <img
                        src={userIcon}
                        alt="this is user"
                        style={{ width: 32, marginRight: 8 }}
                    />
                    {user.first_name} {user.last_name}
                </div>}
            <div className='icon'>
                <span className='icon-note'>{count && count}</span>
                <img
                    src={notiIcon}
                    alt="this is notification"
                    style={{ width: 32 }}
                />
            </div>
            {facts &&
                <div className='tab'>
                    <img
                        src={goldIcon}
                        alt="this is user"
                        style={{ width: 32, marginRight: 8 }}
                    />
                    {formatMoney(totalUsed(factsObject))}
                </div>
            }
        </div>
    );
}

export default HeadNotification;