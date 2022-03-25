import React, { useState } from 'react'
import Card from '@mui/material/Card';
import { Box, Button, CardContent, Modal, Typography, Snackbar, Alert } from '@mui/material';

import s from './Cart.module.scss'

const CartItem = ({ item }) => {

    const addons = [
        {
            'title': 'Корица',
            'value': 'cinnamon',
        },
        {
            'title': 'Мёд',
            'value': 'honey',
        },
        {
            'title': 'С. карамель',
            'value': 'caramel',
        },
        {
            'title': 'фундук',
            'value': 'hazelnuts',
        },
    ]
    const stringAddon = addons.filter((addon) => addon.value === item.addon);

    return (
        <div className={'row card mb-4 ' + s.cartItem}>
            <Card className={s.cartItemContent}>
                <CardContent className='card-body'>
                    <div className='row'>
                        <div className='col-7'>
                            <h5 className='card-title'>
                                {item.name}
                            </h5>
                            <p className='card-text card-subtitle'>
                                {item.description}
                            </p>
                        </div>
                        <div className='col-5'>
                            <p className='font-weight-bold card-text d-flex justify-content-end justify-content-center'>
                                {item.price} руб.
                            </p>
                            {item.addon !== ''
                             ? <p className='card-text d-flex justify-content-end mr-2 justify-content-center'>
                                    {stringAddon[0].title}
                                </p> : <span/>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CartItem;