import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import menuStore from '../../../../store/modules/menuStore'
import MenuListItem from './MenuListItem';
import {Skeleton, TabContext, TabList, TabPanel} from "@mui/lab";
import {Box, CardContent, CircularProgress, Modal, Tab, Tabs, Typography} from "@mui/material";
import userStore from "../../../../store/modules/userStore";
import Card from "@mui/material/Card";

import s from './MenuList.module.scss';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    maxHeight: 400,
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px',
};

const MenuList = ({menu = [], receiveMenu, coffeeHouse, changeCoffeeHouse}) => {

    const [value, setValue] = React.useState('coffee');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [loading, setLoading] = useState(false);
    useEffect(() => {

        const getMenu = async  () => {
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
            <div className={s.header + ' col mb-3 mt-3'}>
                <div className='row d-flex align-item-center justify-content-start'>
                    <span className={s.title + ' mr-3'}>Заберу из</span>
                    <span className={s.subtitle} onClick={handleOpen}> {coffeeHouse.short} </span>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Выберите место, откуда будете забирать заказ
                            </Typography>
                            <div id="modal-modal-description">
                                {
                                    coffeeHouses.map((coffeeHouse) => {
                                        return (
                                            <Card key={coffeeHouse.id} id={coffeeHouse.id} className={'mb-4 border'}
                                                  onClick={() => changeActiveCoffeeHouse(coffeeHouse)}>
                                                <CardContent>
                                                    <Typography variant="h5" component="div">
                                                        {coffeeHouse.title}
                                                    </Typography>
                                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                        {coffeeHouse.address}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        )
                                    })
                                }
                            </div>

                        </Box>
                    </Modal>
                </div>
            </div>
            <TabContext value={value}>
                <div className={'col mb-3 mt-3'}>
                    <div className='row d-flex align-item-center justify-content-start'>
                        <TabList onChange={handleChange} aria-label="lab API tabs">
                            <Tab label="Кофе" value="coffee"/>
                            <Tab label="Не кофе" value="notcoffee"/>
                        </TabList>
                    </div>
                </div>
                <div className='col menu-container'>
                    <TabPanel value='coffee'>
                        {loading
                            ? (
                                <div className={s.spinner}>
                                    <CircularProgress color="success" />
                                </div>
                            )
                            : menu.map((product, index) => {
                                return (
                                    <MenuListItem key={index} item={product}/>
                                )
                            })}
                    </TabPanel>
                    <TabPanel value='notcoffee'>
                        123
                    </TabPanel>
                </div>
            </TabContext>
        </div>
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
