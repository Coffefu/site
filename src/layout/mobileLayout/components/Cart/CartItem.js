import React from 'react'
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';

import s from './Cart.module.scss'

const CartItem = ({ item, addons }) => {

    const stringAddon = addons.filter((addon) => +addon.id === +item.addon);
    return (
        <div className={'row card mb-3 ' + s.cartItem}>
            <Card>
                <CardContent className='card-body'>
                    <div className='row'>
                        <div className='col-7'>
                            <h5 className='card-title'>
                                {item.name}
                                {stringAddon.length !== 0 && item.addon !== ''
                                    ? <span>
                                        {' - ' + stringAddon[0].name}
                                    </span> : <span />}
                            </h5>
                        </div>
                        <div className='col-5'>
                            <p className='font-weight-bold card-text d-flex justify-content-end justify-content-center'>
                                {item.price} руб.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CartItem;