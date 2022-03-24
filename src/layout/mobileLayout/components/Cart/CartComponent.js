import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import s from './Cart.module.scss';
import {Typography} from "@mui/material";
import CartItem from "./CartItem";

const CartComponent = ({  }) => {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(data);
    }, [])

    return (
        <div>
            <div className='col'>
                <div className='row mt-3 mb-3'>
                    <Typography variant='h4'>
                        Мой заказ
                    </Typography>
                </div>
                <div className='row'>
                    {cartItems.map((product, index) => {
                        return (
                            <CartItem key={index} item={product} />
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
};

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(CartComponent);