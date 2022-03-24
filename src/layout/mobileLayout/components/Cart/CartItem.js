import React, { useState } from 'react'
import Card from '@mui/material/Card';
import { Box, Button, CardContent, Modal, Typography, Snackbar, Alert } from '@mui/material';

import s from './Cart.module.scss'

const CartItem = ({ item }) => {

    return (
        <div className={'row card mb-4'}>
            <Card>
                <CardContent className='card-body'>
                    <div className='row'>
                        <div className='col'>
                            <h5 className='card-title'>
                                {item.name}
                            </h5>
                            <p className='card-text'>
                                {item.description}
                            </p>
                        </div>
                        <div className='col d-flex justify-content-end'>
                            <p className='card-text row'>
                                {item.price} руб.
                            </p>
                            {item.addon !== ''
                             ? <p className='card-text row'>
                                    {item.addon}
                                </p> : <span/>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CartItem;