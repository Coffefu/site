import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import moment from 'moment';

import s from './Cart.module.scss';
import {Alert, Button, CircularProgress, Snackbar, TextField, Typography} from "@mui/material";
import CartItem from "./CartItem";
import {LocalizationProvider, MobileTimePicker, TimePicker} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import menuStore from "../../../../store/modules/menuStore";

const CartComponent = ({coffeeHouse, addons, receiveAddons }) => {
    const [cartItems, setCartItems] = useState([])

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
            <div className='mb65-container d-flex flex-column'>
                <div className='mt-3 mb-3'>
                    <Typography variant='h4'>
                        Мой заказ
                    </Typography>
                </div>
                <div className={'container-fluid ' + s.cartItemsContainer}>
                    {cartItems.map((product, index) => {
                        return (
                            <CartItem key={index} item={product} addons={addons}/>
                        )
                    })}
                </div>
                <div className={'mt-auto'}>
                    <Button onClick={makeOrder} className={"btn " + s.makeOrder}>Заказать</Button>
                </div>
            </div>

            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={openErrorAlert}
                onClose={handleCloseAlert}
                key='errorAlert'
            >
                <Alert onClose={handleCloseAlert} severity="error" sx={{width: '100%'}}>
                    Вы заполнили не все данные
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={openSuccessAlert}
                onClose={handleCloseAlert}
                key='successAlert'
                autoHideDuration={6000}
            >
                <Alert onClose={handleCloseAlert} severity="success" sx={{width: '100%'}}>
                    Заказ успешно отправлен
                </Alert>
            </Snackbar>
        </div>
    )
}

const mapStateToProps = state => ({
    coffeeHouse: state.user.coffeeHouse,
    addons: state.menu.addons,
});

const mapDispatchToProps = {
    receiveAddons: menuStore.receiveAddons,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartComponent);