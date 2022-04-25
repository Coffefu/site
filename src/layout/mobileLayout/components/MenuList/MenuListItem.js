import React from 'react'
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';

import s from './MenuList.module.scss'
import { useNavigate } from 'react-router-dom';

const MenuListItem = ({ item }) => {

    const navigate = useNavigate();
    const openProductModal = () => {
        navigate(`/mobile/product/${item.id}`)
    }

    return (
        <div className={'row card mb-4'}>
            <Card onClick={openProductModal} className={s.menuItemCard}>
                <CardContent className='card-body'>
                    <div className='row'>
                        <div className='col'>
                            <h5 className='card-title'>
                                {item.name}
                            </h5>
                        </div>
                        <div className='col d-flex justify-content-end'>
                            <p className='card-text font-weight-bold'>
                                {item.variations.reduce((a, b) => a += b.price + '/', '').slice(0, -1)} руб.
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <p className='card-text'>
                                {item.description}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default MenuListItem;