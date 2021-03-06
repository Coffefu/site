import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { useCookies } from "react-cookie";

import s from './Cart.module.scss';
import {
    Button,
    CircularProgress,
    TextareaAutosize,
    Typography
} from "@mui/material";
import CartItem from "./CartItem";
import menuStore from "../../../../store/modules/menuStore";
import userStore from "../../../../store/modules/userStore";
import _ from 'lodash';
import TimePickerModal from './TimePickerModal';

const { REACT_APP_ENVIRONMENT } = process.env;

const CartComponent = ({
    coffeeHouse,
    addons,
    receiveAddons,
    changeOrder,
    showErrorPopup,
    showSuccessPopup
}) => {

    const [cookies, setCookie] = useCookies(["jwt"]);
    const [cartItems, setCartItems] = useState([]);
    const [openTimePicker, setOpenTimePicker] = useState(false);
    const closeTimePicker = () => setOpenTimePicker(false);

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCartItems([])
    }

    const deleteItem = (item) => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        let deleted = false
        const newCart = cart.filter(product => {
            if (deleted) {
                return true;
            }
            if (_.isEqual(product, item)) {
                deleted = true;
            }
            return !_.isEqual(product, item);
        })
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCartItems(newCart);
    }


    const [time, setTime] = useState(new Date().setMilliseconds(new Date().getMilliseconds() + 360000));
    const [comment, setComment] = useState('')
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

    const successOrder = (number) => {
        setOrderNumber(number);
        showSuccessPopup(`?????????? ?????????????? ??????????????????. ?????????? ???????????? ???????????? - ${number}`)
        clearCart();
    }
    const makeOrder = () => {
        if (time - new Date() < 0) {

            showErrorPopup('?????????????? ???????????????? ??????????. ???????????????? ???????? ?????? ??????????????!')
            return;
        }

        if (!coffeeHouse.id) {

            showErrorPopup('???????? ???? ??????????????!')
            return;
        }

        const order = {};
        order.coffee_house = coffeeHouse.id;
        order.products = [];
        cartItems.forEach((product) => {
            const addon = addons.filter((addon) => product.addon.map(item => item.id).includes(addon.id))
            order.products.push({ id: product.id, toppings: addon.length > 0 ? [...addon.map(item => item.id)] : [] })
        })
        order.time = moment(time).format("YYYY-MM-DD HH:mm");
        order.comment = comment;
        const sendOrder = async () => {
            try {
                const request = await fetch(`https://cofefu.ru${REACT_APP_ENVIRONMENT || ''}/api/make_order`, {
                    method: 'POST',
                    body: JSON.stringify(order),
                    headers: {
                        'Content-Type': 'application/json',
                        'jwt-token': cookies.jwt
                    }
                })
                const response = await request.json();
                if (response.detail) {
                    showErrorPopup(response.detail);
                }
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
                        ?? ?????????? ?????????????? ??????????!
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
                        ?????? ??????????
                    </Typography>
                </div>
                <div className={'container-fluid mb-auto ' + s.cartItemsContainer}>
                    {cartItems.map((product, index) => {
                        return (
                            <CartItem key={index} item={product} addons={addons} deleteItem={deleteItem} />
                        )
                    })}
                </div>
                <div>
                    <div className='col mt-2'>
                        <div className={'row flex-column d-flex align-items-center justify-content-center'}>
                            <div className={'form-group d-flex flex-column'}>
                                <div className={'row mb-2 d-flex align-items-center'}>
                                    <div className={'col'}>
                                        <label>
                                            ??????????????????????
                                        </label>
                                    </div>
                                    <div className={'col'}>
                                        <TextareaAutosize
                                            aria-label="comment"
                                            maxRows={3}
                                            maxLength={200}
                                            value={comment}
                                            onChange={(evt) => setComment(evt.target.value)}
                                            placeholder="?????? ??????????????????????"
                                            style={{ background: "inherit" }}
                                        />
                                    </div>
                                </div>
                                <div className={'row mb-2 d-flex align-items-center'}>
                                    <div className={'col'}>
                                        <label>
                                            ???? ?????????????? ?????????????????
                                        </label>
                                    </div>
                                    <div className={'col'}>
                                        <TimePickerModal
                                            handleOpen={() => setOpenTimePicker(true)}
                                            open={openTimePicker}
                                            handleClose={closeTimePicker}
                                            time={time}
                                            setTime={setTime} />
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
                                <Button onClick={makeOrder} className={"btn " + s.makeOrder}>????????????????</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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