import React from 'react'
import Card from '@mui/material/Card';
import { CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import s from './Cart.module.scss'

const CartItem = ({ item, addons, deleteItem }) => {

    const stringAddon = addons.filter((addon) => item.addon.map(item => item.id).includes(addon.id))
    return (
        <div className={'row card mb-3 ' + s.cartItem}>
            <Card>
                <CardContent className='card-body'>
                    <div className='row'>
                        <div className='col-7'>
                            <h5 className='card-title'>
                                {item.name}
                            </h5>
                        </div>
                        <div className='col-5'>
                            <p className='font-weight-bold card-text d-flex justify-content-end justify-content-center'>
                                {item.price} руб.
                            </p>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-9'>
                            {stringAddon.length !== 0 && item.addon !== ''
                                ? <span>
                                    + {stringAddon.map(item => item.name).join(' + ')}
                                </span> : <span />}
                        </div>
                        <div className='col-3'>
                            <IconButton aria-label="delete" onClick={() => deleteItem(item)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CartItem;