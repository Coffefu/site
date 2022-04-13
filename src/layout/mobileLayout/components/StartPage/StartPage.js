import React, { useState } from "react";
import coffeeBeans from '../../../../assets/img/coffeeBeans.png';
import { Alert, Box, Button, IconButton, Modal, Snackbar, TextField, Typography } from "@mui/material";
import s from "./StartPage.module.scss";
import { useCookies } from "react-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactCodeInput from "react-verification-code-input";
import { connect } from 'react-redux';
import navigationStore from './../../../../store/modules/navigationStore';

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 'none',
    p: 4,
    textAlign: 'center',
    color: '#000000'
};

const StartPage = ({ changeActiveTab }) => {

    const [isLogin, setIsLogin] = useState(true)
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [nameValid, setNameValid] = useState(null);
    const [phoneValid, setPhoneValid] = useState(null);
    const [cookies, setCookie] = useCookies(["jwt"]);
    const [code, setCode] = useState('')

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const closeModal = () => {
        handleClose();
    }

    const [openLoginSuccessAlert, setOpenLoginSuccessAlert] = useState(false);
    const [openCodeErrorAlert, setOpenCodeErrorAlert] = useState(false)
    const [wrongTelephoneAlert, setWrongTelephoneAlert] = useState(false)
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
    };

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

    const verifyPhone = () => {
        const newWindow = window.open('https://t.me/cofefu_bot');
        if (newWindow) newWindow.opener = null
    }

    const userLoginRegistration = () => {
        if (isLogin) {
            if (phone === '' || !phoneValid) {
                setOpenErrorAlert(true);
                return;
            }
        } else {
            if (name === '' || phone === '' || !phoneValid) {
                setOpenErrorAlert(true);
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
                    const request = await fetch('https://cofefu.ru/api/register_customer', {
                        method: 'POST',
                        body: JSON.stringify(customer),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const response = await request.json();
                    if (response.detail) {
                        setWrongTelephoneAlert(true);
                        return;
                    }
                    if (response) {
                        setOpenSuccessAlert(true);
                        setCookie('jwt', response);
                        changeActiveTab('menu');
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
                    const request = await fetch('https://cofefu.ru/api/send_login_code', {
                        method: 'POST',
                        body: JSON.stringify(customer),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const response = await request.json();
                    if (response === 'Success') {
                        handleOpen();
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

    const changeCode = (event) => {
        setCode(event);
    }

    const verify = () => {
        if (code.length < 6) {
            setOpenCodeErrorAlert(true);
            return;
        }

        const sendVerifyCode = async () => {
            try {
                const request = await fetch(`https://cofefu.ru/api/verify_login_code?code=${code}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const response = await request.json();
                if (response.detail === 'Неверный код подтверждения.') {
                    setOpenCodeErrorAlert(true);
                } else {
                    setCookie('jwt', response);
                    setOpenLoginSuccessAlert(true);
                    changeActiveTab('menu');
                }
            } catch (e) {
                console.log(e)
            }
        }

        sendVerifyCode();
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
                    {isLogin ? 'Войти' : 'Регистрация'}
                </Button>
                <Typography className='mt-3' onClick={verifyPhone} variant='subtitle2'>
                    Подтвердить телефон
                </Typography>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
                <Typography onClick={changeIsLogin} style={{ cursor: 'pointer' }} variant='subtitle1'>
                    {isLogin ? 'Регистрация' : 'Войти'}
                </Typography>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='d-flex justify-content-start h6'>
                        <IconButton aria-label="delete" onClick={closeModal} className='p-0'>
                            <ArrowBackIcon color='#000000' />
                        </IconButton>
                    </div>

                    <Typography className='mb-3' id="modal-modal-title" variant="h4" component="h2">
                        Введите код потверждения
                    </Typography>

                    <div className="p-3 d-flex flex-column align-items-center justify-content-between">
                        <ReactCodeInput
                            type="number"
                            fields={6}
                            value={code}
                            onChange={changeCode} />
                    </div>

                    <div className='mt-auto d-flex justify-content-center'>
                        <Button sx={{ border: '1px solid black', color: '#c28760' }} onClick={verify}
                            className={"btn"}>
                            подтвердить
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openLoginSuccessAlert}
                onClose={handleCloseAlert}
                key='loginSuccessAlert'
                autoHideDuration={6000}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Успешный вход
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openCodeErrorAlert}
                onClose={handleCloseAlert}
                key='codeErrorAlert'
                autoHideDuration={6000}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Неверный код подтверждения
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openErrorAlert}
                onClose={handleCloseAlert}
                key='errorAlert'
                autoHideDuration={6000}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Данные не заполнены!
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSuccessAlert}
                onClose={handleCloseAlert}
                key='successAlert'
                autoHideDuration={6000}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Регистрация успешна!
                    <p>
                        Не забудьте потвердить номер телефона!
                    </p>
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={wrongTelephoneAlert}
                onClose={handleCloseAlert}
                key='wrongTelephoneAlert'
                autoHideDuration={6000}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Пользователь с таким номером телефона уже существует.
                </Alert>
            </Snackbar>
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
