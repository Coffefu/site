import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import menuStore from '../../../../store/modules/menuStore'
import MenuListItem from './MenuListItem';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { CircularProgress, Tab } from "@mui/material";
import userStore from "../../../../store/modules/userStore";

import s from './MenuList.module.scss';
import TopHeader from './MenuListHeader';

const MenuList = ({ menu, receiveMenu, coffeeHouse, changeCoffeeHouse, receiveAddons, addons }) => {

    const [value, setValue] = useState('coffee');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [search, setSearch] = useState('');
    const [activeMenu, setActiveMenu] = useState(menu)

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (menu === []) {
            setLoading(true);
        } else {
            setLoading(false);
            setActiveMenu(menu)
        }
    }, [menu])
    useEffect(() => {
        const getMenu = async () => {
            setLoading(true);
            await receiveMenu();
            await receiveAddons();
            setLoading(false);
        }
        if (search === '') {
            getMenu();
            setActiveMenu(menu)
            return;
        }
        setActiveMenu(menu.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())));
    }, [search])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            id: '1',
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
                search={search}
                setSearch={setSearch}
            />

            <div className={s.menuContent}>
                <TabContext value={value}>
                    <div className={'col mb-3 mt-1'}>
                        <div className='row d-flex align-item-center justify-content-start'>
                            <TabList onChange={handleChange} aria-label="lab API tabs">
                                <Tab label="Кофе" value="coffee" />
                            </TabList>
                        </div>
                    </div>
                    <div className='mb65-container'>
                        <TabPanel value='coffee'>
                            {loading && activeMenu.length > 0
                                ? (
                                    <div className={s.spinner}>
                                        <CircularProgress color="success" />
                                    </div>
                                )
                                : activeMenu.map((product) => {
                                    return (
                                        <MenuListItem key={product.id} item={product} addons={addons} />
                                    )
                                })}
                        </TabPanel>
                    </div>
                </TabContext >
            </div>
        </div >
    )
}

const mapStateToProps = state => ({
    menu: state.menu.menu,
    addons: state.menu.addons,
    coffeeHouse: state.user.coffeeHouse,
});

const mapDispatchToProps = {
    receiveMenu: menuStore.receiveMenu,
    receiveAddons: menuStore.receiveAddons,
    changeCoffeeHouse: userStore.changeCoffeeHouse,
};

export const ConnectedMenuList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuList);
