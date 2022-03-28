import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import moment from 'moment';

import s from './Cart.module.scss';
import {Alert, Button, CircularProgress, Snackbar, TextField, Typography} from "@mui/material";
import CartItem from "./CartItem";
import {LocalizationProvider, MobileTimePicker, TimePicker} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import menuStore from "../../../../store/modules/menuStore";

const CartUserData = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [time, setTime] = React.useState(new Date());

    const [loading, setLoading] = useState(false);
    useEffect(() => {

        const getAddons = async () => {
            setLoading(true);
            await receiveAddons();
            setLoading(false);
        }
        getAddons();
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(data);
    }, [])

    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
    };

    const handleTelephoneChange = (event) => {
        setTelephone(event.target.value)
    }
    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const makeOrder = () => {
        if (name === '' || telephone === '' || time - new Date() < 0) {

            setOpenErrorAlert(true);
            return;
        }

        const order = {};
        order.coffee_house = coffeeHouse.id
        order.customer = {
            name,
            "phone_number": telephone,
            'email': email,
        }
        order.products = [];
        cartItems.map((product) => {
            const addon = addons.filter((addon) => addon.value === product.addon);
            order.products.push({ id: product.id, toppings: addon[0] ? [addon[0].id] : [] })
        })
        order.time = moment(time).format("YYYY-MM-DD HH:mm");

        const sendOrder = async () => {
            try {
                const request = await fetch('https://cofefu.ru/make_order', {
                    method: 'POST',
                    body: JSON.stringify(order),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const response = await request.json();
                if (response === 'Success') {
                    setOpenSuccessAlert(true);
                }
            } catch (e) {
                console.log(e)
            }
        }

        sendOrder()
    }

    if (loading) {
        return (
            <div >
                <CircularProgress color="success" />
            </div>
        )
    }

    return (
        <div>
            <div className='col mb65-container'>
                <div className={'row flex-column d-flex align-items-center justify-content-center'}>
                    <div className={'form-group d-flex flex-column'}>
                        <div className={'row mb-1'}>
                            <div className={'col'}>
                                <label>
                                    Имя
                                </label>
                            </div>
                            <div className={'col'}>
                                <input value={name} onChange={handleNameChange} placeholder={'Ваше имя'}
                                       className={'ml-1'} type={'text'}/>
                            </div>
                        </div>
                        <div className={'row mb-2'}>
                            <div className={'col'}>
                                <label>
                                    Телефон
                                </label>
                            </div>
                            <div className={'col'}>
                                <input value={telephone} onChange={handleTelephoneChange} placeholder={'Номер телефона'}
                                       className={'ml-1'} type={'text'}/>
                            </div>
                        </div>
                        <div className={'row mb-2 d-flex align-items-center'}>
                            <div className={'col'}>
                                <label>
                                    Во сколько заберете?
                                </label>
                            </div>
                            <div className={'col ' + s.timePicker}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        ampm={false}
                                        ampmInClock={false}
                                        value={time}
                                        onChange={setTime}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>
                    <div className={'row'}>
                        <Button onClick={makeOrder} className={"btn " + s.makeOrder}>Заказать</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartUserData;