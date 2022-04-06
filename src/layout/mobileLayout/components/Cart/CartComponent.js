import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import moment from 'moment';

import s from './Cart.module.scss';
import { Alert, Button, CircularProgress, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import CartItem from "./CartItem";
import { LocalizationProvider, MobileTimePicker } from "@mui/lab";
import DeleteIcon from '@mui/icons-material/Delete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import menuStore from "../../../../store/modules/menuStore";
import userStore from "../../../../store/modules/userStore";

const CartComponent = ({coffeeHouse, addons, receiveAddons, changeOrder }) => {
    const [cartItems, setCartItems] = useState([])

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCartItems([])
    }

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [time, setTime] = React.useState(new Date());

    const [orderNumber, setOrderNumber] = useState(null);

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
    const successOrder = (number) => {
        setOrderNumber(number);
        setOpenSuccessAlert(true)
    }
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
        order.coffee_house = coffeeHouse.id;
        order.customer = {
            name,
            "phone_number": telephone.slice(telephone.length - 10),
        }
        order.products = [];
        cartItems.map((product) => {
            const addon = addons.filter((addon) => addon.value === product.addon);
            order.products.push({ id: product.id, toppings: addon[0] ? [addon[0].id] : [] })
        })
        order.time = moment(time).format("YYYY-MM-DD HH:mm");

        const sendOrder = async () => {
            try {
                const request = await fetch('https://cofefu.ru/api/make_order', {
                    method: 'POST',
                    body: JSON.stringify(order),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const response = await request.json();
                if (response['order_number']) {
                    const orderNumber = response['order_number']
                    successOrder(orderNumber);
                    changeOrder({
                        number: orderNumber,
                        time: time,
                    });
                }
            } catch (e) {
                console.log(e)
            }
        }

        sendOrder();
    }

    if (loading) {
        return (
            <div className='mb65-container d-flex flex-column justify-content-center align-items-center height-100'>
                <CircularProgress color="success" />
            </div>
        )
    }

    if (cartItems.length === 0) {
        return (
            <div>
                <div className='mb65-container d-flex flex-column align-items-center justify-content-center height-100'>
                    <Typography variant={'h5'}>
                        В вашей корзине пусто!
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='mb65-container height-100 d-flex flex-column'>
                <div className='mt-3 mb-3 d-flex justify-content-between'>
                    <Typography variant='h4'>
                        Мой заказ
                    </Typography>
                    <IconButton aria-label="delete" onClick={clearCart}>
                        <DeleteIcon />
                    </IconButton>
                </div>
                <div className={'container-fluid mb-auto ' + s.cartItemsContainer}>
                    {cartItems.map((product, index) => {
                        return (
                            <CartItem key={index} item={product} addons={addons}/>
                        )
                    })}
                </div>
                <div>
                    <div className='col mt-2'>
                        <div className={'row flex-column d-flex align-items-center justify-content-center'}>
                            <div className={'form-group d-flex flex-column'}>
                                <div className={'row mb-1'}>
                                    <div className={'col'}>
                                        <label>
                                            Имя
                                        </label>
                                    </div>
                                    <div className={'col'}>
                                        <input required value={name} onChange={handleNameChange} placeholder={'Ваше имя'}
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
                                        <input required value={telephone} onChange={handleTelephoneChange} placeholder={'Номер телефона'}
                                               className={'ml-1'} type={'tel'} pattern={'^(\\+7|7|8)[0-9]{10}$'}/>
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
                                            <MobileTimePicker
                                                ampm={false}
                                                ampmInClock={false}
                                                value={time}
                                                onChange={setTime}
                                                cancelText={'Отмена'}
                                                openTo={'minutes'}
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
                <Alert onClose={handleCloseAlert} severity="success" sx={{width: '100%', fontSize: '16px'}}>
                    <p>
                        Заказ успешно отправлен
                    </p>
                    <p>
                        Номер вашего заказа - {orderNumber}
                    </p>
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
    changeOrder: userStore.changeOrder,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartComponent);