import React, { useState, useEffect } from 'react';
import './App.css';

function InvoiceDetail({ invoiceDetail }) {

    const formatMoney = (number) => {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'VND' });
    }

    return (
       <li>
        Tên sản phẩm: <span className='time'>{invoiceDetail?.Product?.name}</span> - Thành tiền: <span className='time'>{formatMoney(invoiceDetail?.Product?.price)}</span>
       </li>
    );
}

export default InvoiceDetail;