import React, { useState, useEffect } from 'react';
import './App.css';
import InvoiceDetail from './InvoiceDetail'

function Invoice({ invoice }) {
    const [invoiceObj, setInvoice] = useState(null);
    const [invoiceDetails, setInvoiceDetails] = useState([]);

    useEffect(() => {
        var dataInvoice = JSON.parse(invoice)[0];
        setInvoice(dataInvoice);
        var details = dataInvoice?.InvoiceDetails || [];
        setInvoiceDetails(details);
    }, [invoice]);

    const formatMoney = (number) => {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'VND' });
    }

    const totalUsed = (data) => {
        let sum = 0;
        var ivdt = data?.InvoiceDetails || [];
        ivdt.forEach(e => {
            sum = sum + (e?.Product?.price || 0);
        })

        return sum;
    }

    console.log(invoiceObj);

    return (
        invoiceObj &&
        <div className='invoice'>
            <div>Bạn đã thanh toán hoá đơn <span className='link'>{invoiceObj.invoice_code}</span> vào lúc <span className='time'>{new Date(invoiceObj.createdAt).toLocaleString()}</span> tổng tiền là: <span className='time'>{formatMoney(totalUsed(invoiceObj))}</span></div>
            <ul>
            {invoiceDetails.map((invoiceDetail, index)=>(
                <InvoiceDetail invoiceDetail={invoiceDetail}/>
            ))}
            </ul>
        </div>
        || null
    );
}

export default Invoice;