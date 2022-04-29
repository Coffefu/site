import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import menuStore from '../../../../store/modules/menuStore'
import MenuListItem from './MenuListItem';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { CircularProgress, Slide, Tab } from "@mui/material";
import userStore from "../../../../store/modules/userStore";

import s from './MenuList.module.scss';
import TopHeader from './MenuListHeader';
import { useSwipeable } from "react-swipeable";
import { useNavigate } from 'react-router-dom';

const MenuList = ({
    menu,
    coffeeHouses,
    receiveCoffeeHouses,
    receiveMenu,
    coffeeHouse,
    changeCoffeeHouse,
    receiveAddons,
    addons
}) => {

    const navigate = useNavigate();
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
            await receiveCoffeeHouses();
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
    const handleOpen = () => {
        navigate('coffeehouse');
    }
    const handleClose = () => setOpen(false);

    const changeActiveCoffeeHouse = (coffeeHouse) => {
        changeCoffeeHouse(coffeeHouse)
        handleClose();
    }

    const swipedMenu = (evt) => {
        if (value === 'coffee' && evt.dir === 'Left') {
            setValue('notCoffee')
        }
        if (value === 'notCoffee' && evt.dir === 'Right') {
            setValue('coffee')
        }
    }
    const handlers = useSwipeable({ onSwiped: swipedMenu })

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
                                <Tab label="Не кофе" value="notCoffee" />
                            </TabList>

                        </div>
                    </div>
                    <div className='mb65-container' {...handlers}>
                        <Slide direction="right" in={value === 'coffee'} mountOnEnter unmountOnExit>
                            <TabPanel value='coffee'>
                                {loading && activeMenu.length > 0
                                    ? (
                                        <div className={s.spinner}>
                                            <CircularProgress color="success" />
                                        </div>
                                    )
                                    : activeMenu.map((product, index) => {
                                        if (product.type === 0) {
                                            return (
                                                <MenuListItem key={index} item={product} addons={addons} />
                                            )
                                        }
                                    })}
                            </TabPanel>
                        </Slide>
                        <Slide direction="left" in={value === 'notCoffee'} mountOnEnter unmountOnExit>
                            <TabPanel value='notCoffee'>

                                {loading && activeMenu.length > 0
                                    ? (
                                        <div className={s.spinner}>
                                            <CircularProgress color="success" />
                                        </div>
                                    )
                                    : activeMenu.map((product, index) => {
                                        if (product.type === 1) {
                                            return (
                                                <MenuListItem key={index} item={product} addons={addons} />
                                            )
                                        }
                                    })}
                            </TabPanel>
                        </Slide>
                    </div>
                </TabContext>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    menu: state.menu.menu,
    addons: state.menu.addons,
    coffeeHouse: state.user.coffeeHouse,
    coffeeHouses: state.menu.coffeeHouses,
});

const mapDispatchToProps = {
    receiveMenu: menuStore.receiveMenu,
    receiveAddons: menuStore.receiveAddons,
    changeCoffeeHouse: userStore.changeCoffeeHouse,
    receiveCoffeeHouses: menuStore.receiveCoffeeHouses
};

export const ConnectedMenuList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuList);
