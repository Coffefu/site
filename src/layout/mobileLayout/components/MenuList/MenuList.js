import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import menuStore from '../../../../store/modules/menuStore'
import MenuListItem from './MenuListItem';
import { Skeleton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, CardContent, CircularProgress, Modal, Tab, Tabs, Typography } from "@mui/material";
import userStore from "../../../../store/modules/userStore";
import Card from "@mui/material/Card";

import s from './MenuList.module.scss';
import TopHeader from './MenuListHeader';

const MenuList = ({ menu = [], receiveMenu, coffeeHouse, changeCoffeeHouse }) => {

    const [value, setValue] = React.useState('coffee');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [loading, setLoading] = useState(false);
    useEffect(() => {

        const getMenu = async () => {
            setLoading(true);
            await receiveMenu();
            setLoading(false);
        }
        getMenu();
    }, [])

    const changeActiveCoffeeHouse = (coffeeHouse) => {
        changeCoffeeHouse(coffeeHouse)
        handleClose();
    }

    const coffeeHouses = [
        {
            id: '1',
            title: 'Полка кофе',
            address: 'Корпус E, 6 этаж \n Открыто до 20:00',
            short: 'E6'
        },
        {
            id: '2',
            title: 'Полка кофе',
            address: 'Корпус D, 7 этаж \n Открыто до 20:00',
            short: 'D7'
        }
    ]

    return (
        <div>
            <TopHeader
                coffeeHouse={coffeeHouse}
                changeActiveCoffeeHouse={changeActiveCoffeeHouse}
                coffeeHouses={coffeeHouses}
                handleOpen={handleOpen}
                handleClose={handleClose}
                open={open}
            />

            <div className={s.menuContent}>
                <TabContext value={value}>
                    <div className={'col mb-3 mt-1'}>
                        <div className='row d-flex align-item-center justify-content-start'>
                            <TabList onChange={handleChange} aria-label="lab API tabs">
                                <Tab label="Кофе" value="coffee" />
                                <Tab label="Не кофе" value="notcoffee" />
                            </TabList>
                        </div>
                    </div>
                    <div className='menu-container'>
                        <TabPanel value='coffee'>
                            {loading
                                ? (
                                    <div className={s.spinner}>
                                        <CircularProgress color="success" />
                                    </div>
                                )
                                : menu.map((product) => {
                                    return (
                                        <MenuListItem key={product.id} item={product} />
                                    )
                                })}
                        </TabPanel>
                        <TabPanel value='notcoffee'>
                            123
                        </TabPanel>
                    </div>
                </TabContext >
            </div>
        </div >
    )
}

const mapStateToProps = state => ({
    menu: state.menu.menu,
    coffeeHouse: state.user.coffeeHouse,
});

const mapDispatchToProps = {
    receiveMenu: menuStore.receiveMenu,
    changeCoffeeHouse: userStore.changeCoffeeHouse,
};

export const ConnectedMenuList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuList);
