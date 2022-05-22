import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import moment from "moment";
import { useCookies } from "react-cookie";
import 'moment/locale/ru';

import s from "./Order.module.scss"
import {connect} from "react-redux";
import menuStore from "../../../../store/modules/menuStore";

const { REACT_APP_ENVIRONMENT } = process.env;

const Order = ({ showErrorPopup, coffeeHouses, receiveCoffeeHouses }) => {

    const [cookies, setCookie] = useCookies(["jwt"]);
    const [coffeeHouse, setCoffeeHouse] = useState(null)
    moment.locale('ru');

    useEffect(() => {
        receiveCoffeeHouses();
    }, [])

    const [order, setOrder] = useState(null);
    useEffect(() => {

        if (!order || order.status !== 'Отдан покупателю' || order.status !== 'Готов' || order.status !== 'Не забран покупателем') {
            checkStatus();
            const interval = setInterval(() => {
                checkStatus();
            }, 60000);

            return () => clearInterval(interval);
        }
    }, [])

    const checkStatus = async () => {
        try {
            const res = await fetch(`https://cofefu.ru${REACT_APP_ENVIRONMENT || ''}/api/last_order`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'jwt-token': cookies.jwt
                    }
                }).then(res => res.json());
            if (res && res.detail) {
                setOrder(null);
                showErrorPopup(res.detail);
                return;
            }
            setOrder(res);
            if (coffeeHouses) {
                setCoffeeHouse(coffeeHouses.filter(item => item.id === res.coffee_house)[0]);
            }
        } catch (e) {
            console.log(e);
        }
    }

    if (!order) {
        return (
            <div>
                <div className='mb65-container d-flex flex-column align-items-center justify-content-center height-100'>
                    <Typography variant={'h5'}>
                        Нет активного заказа!
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='mb65-container d-flex flex-column'>
                <div className='mt-3 mb-3'>
                    <Typography variant='h4'>
                        Последний заказ
                    </Typography>
                </div>
                <div className='mt-3 mb-3 d-flex justify-content-center align-items-center flex-column'>
                    <Typography variant='body1'>
                        Номер заказа
                    </Typography>
                    <Typography variant='h1'>
                        {order.order_number}
                    </Typography>
                </div>
                <div className='mt-3 mb-3 d-flex justify-content-center align-items-center flex-column'>
                    <Typography variant='body1'>
                        Статус заказа
                    </Typography>
                    <Typography variant='h5'>
                        {order.status}
                    </Typography>
                </div>

                {
                    order.status === 'Не забран покупателем' || order.status === 'Отдан покупателю' || order.status === 'Отклонен' || order.status.includes('отклонен') ? <></>
                        : (<div className='mt-3 mb-3 d-flex justify-content-center align-items-center flex-column'>
                            <Typography variant='body1'>
                                Будет готов к
                            </Typography>
                            <Typography variant='h5'>
                                {moment(order.time).format('DD MMMM HH:mm')}
                            </Typography>
                        </div>)
                }

                {
                    !coffeeHouse || (order.status === 'Не забран покупателем' || order.status === 'Отдан покупателю' || order.status === 'Отклонен' || order.status.includes('отклонен')) ? <></>
                        : (<div className='mt-3 mb-3 d-flex justify-content-center align-items-center flex-column'>
                            <Typography variant='body1'>
                                Кофейня
                            </Typography>
                            <Typography variant='h5'>
                                {coffeeHouse.name + ' ' + coffeeHouse.placement}
                            </Typography>
                        </div>)
                }

                <div className="d-flex align-items-center justify-content-center">
                    <Button className={'btn ' + s.update} onClick={checkStatus}>Обновить</Button>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    coffeeHouses: state.menu.coffeeHouses,
});

const mapDispatchToProps = {
    receiveCoffeeHouses: menuStore.receiveCoffeeHouses,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order);