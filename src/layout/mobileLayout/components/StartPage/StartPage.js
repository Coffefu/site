import React, { useState } from "react";
import coffeeBeans from '../../../../assets/img/coffeeBeans.png';
import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import s from "./StartPage.module.scss";
import { useCookies } from "react-cookie";
import { connect } from 'react-redux';
import navigationStore from './../../../../store/modules/navigationStore';
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import { usePopup } from "react-hook-popup";

const StartPage = ({ changeActiveTab, showErrorPopup, showSuccessPopup }) => {

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true)
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [nameValid, setNameValid] = useState(null);
    const [phoneValid, setPhoneValid] = useState(null);
    const [cookies, setCookie] = useCookies(["jwt"]);

    const handleNameChange = (event) => {
        if (/^[a-zA-Zа-яА-Я]+$/.test(event.target.value) || event.target.value === '') {
            setName(event.target.value);
        }
    }

    const handleTelephoneChange = (event) => {
        setPhone(event.target.value);
        if (!/^(\+7|7|8)[0-9]{10}$/.test(event.target.value)) {
            setPhoneValid(false);
        } else {
            setPhoneValid(true)
        }
    }

    const userLoginRegistration = () => {
        if (isLogin) {
            if (phone === '' || !phoneValid) {
                showErrorPopup('Номер заполнен неверно!')
                return;
            }
        } else {
            if (name === '' || phone === '' || !phoneValid) {
                showErrorPopup('Данные не заполнены!')
                return;
            }
        }
        const customer = {
            name: name,
            phone_number: phone.slice(phone.length - 10),
        }
        if (!isLogin) {

            const registerCustomer = async () => {
                try {
                    const request = await fetch('https://cofefu.ru/dev/api/register_customer', {
                        method: 'POST',
                        body: JSON.stringify(customer),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const response = await request.json();
                    if (response.detail) {
                        showErrorPopup(response.detail)
                        return;
                    }
                    if (response) {
                        showSuccessPopup('Регистрация успешна. Не забудьте подтвердить номер телефона!')
                        setCookie('jwt', response,
                            {
                                path: '/',
                                expires: new Date(moment().add(15, 'd').format()),
                            });
                        changeActiveTab('menu');
                        navigate('/mobile/menu');
                    }
                } catch (e) {
                    console.log(e)
                }
            }

            registerCustomer();
        }
        if (isLogin) {
            const loginCustomer = async () => {
                try {
                    const request = await fetch('https://cofefu.ru/dev/api/send_login_code', {
                        method: 'POST',
                        body: JSON.stringify(customer),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const response = await request.json();
                    if (response.detail) {
                        showErrorPopup(response.detail)
                    }
                    if (response === 'Success') {
                        navigate('/login/verify');
                    }
                } catch (e) {
                    console.log(e)
                }
            }

            loginCustomer();
        }
    }

    const changeIsLogin = () => {
        setIsLogin(!isLogin);
    }

    return (
        <div className='container pt-4 '>
            <div className='d-flex flex-column align-items-center justify-content-center height-100 mb-2'>
                <div className='mb-4 d-flex flex-column align-items-center justify-content-center'>
                    <img src={coffeeBeans} width='120' alt='coffee beans' />
                    <Typography className='pt-1' variant='h4'>
                        Cofefu
                    </Typography>
                </div>
                {!isLogin
                    ? (<TextField
                        onChange={handleNameChange}
                        className='mb-2'
                        id="userName"
                        label="Имя"
                        variant="outlined"
                        error={nameValid !== null && !nameValid}
                        value={name}
                    />) : null}
                <TextField
                    inputProps={{ type: 'tel' }}
                    className='mb-4'
                    id="userNumber"
                    label="Номер телефона"
                    variant="outlined"
                    value={phone}
                    onChange={handleTelephoneChange}
                    error={phoneValid !== null && !phoneValid}
                />
                <Button sx={{ border: '1px solid black', color: '#c28760' }}
                    className={"btn " + s.login}
                    onClick={userLoginRegistration}
                >
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>
                <Typography className='mt-3' onClick={changeIsLogin} style={{ cursor: 'pointer' }} variant='subtitle1'>
                    {isLogin ? 'Регистрация' : 'Войти'}
                </Typography>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    changeActiveTab: navigationStore.changeActiveTab
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPage);
