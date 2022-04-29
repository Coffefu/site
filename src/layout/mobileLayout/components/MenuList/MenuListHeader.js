import React from 'react'
import { Box, CardContent, Modal, Typography, IconButton, Card, InputBase, Drawer } from "@mui/material";
import { styled } from '@mui/material/styles';
import PlaceIcon from '@mui/icons-material/Place';
import MapIcon from '@mui/icons-material/Map';

import s from './MenuList.module.scss';
import { useNavigate } from 'react-router-dom';

const TopHeader = ({
    coffeeHouse,
    handleOpen,
}) => {

    const navigate = useNavigate();

    const openMap = () => {
        navigate('map');
    }

    return (
        <div className={s.headerWrapper}>
            <div className={'mb-3 mt-3 d-flex flex-column'}>
                <div className={s.headerPlace + ' mb-1 mt-3 '}>
                    <div className='d-flex align-item-center justify-content-center'>
                        <span className={s.title + ' mr-1'}>
                            <PlaceIcon sx={{ marginBottom: "6px" }} />
                        </span>
                        <span className={s.subtitle}
                            onClick={handleOpen}> {coffeeHouse.name + ' ' + coffeeHouse.placement}
                        </span>
                    </div>
                </div>
                <div className={s.headerPlace + ' mb-2 mt-1 '}>
                    <div className='d-flex'>
                        <span className={s.title + ' mr-1'}>
                            <MapIcon sx={{ marginBottom: "2px" }} />
                        </span>
                        <span className={s.subtitle}
                            onClick={openMap}> На карте
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopHeader;