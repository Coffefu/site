import React, {useState} from "react";
import coffeeBeans from '../../../../assets/img/coffeeBeans.png';
import {Button, TextField, Typography} from "@mui/material";
import s from "./StartPage.module.scss";

const StartPage = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [nameValid, setNameValid] = useState(null);
    const [phoneValid, setPhoneValid] = useState(null);

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

    const registrationPage = () => {

    }

    return (
        <div className='container pt-4 '>
            <div className='d-flex flex-column align-items-center justify-content-center height-100 mb-2'>
                <div className='mb-4 d-flex flex-column align-items-center justify-content-center'>
                    <img src={coffeeBeans} width='120' alt='coffee beans'/>
                    <Typography className='pt-1' variant='h4'>
                        Cofefu
                    </Typography>
                </div>
                <TextField
                    onChange={handleNameChange}
                    className='mb-2'
                    id="userName"
                    label="Имя"
                    variant="outlined"
                    error={nameValid !== null && !nameValid}
                    value={name}
                />
                <TextField
                    inputProps={{ type: 'tel'}}
                    className='mb-4'
                    id="userNumber"
                    label="Номер телефона"
                    variant="outlined"
                    value={phone}
                    onChange={handleTelephoneChange}
                    error={phoneValid !== null && !phoneValid}
                />
                <Button sx={{border: '1px solid black', color: '#c28760'}}
                        className={"btn " + s.login}>
                    Войти
                </Button>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
                <Typography onClick={registrationPage} style={{ cursor: 'pointer'}} variant='subtitle1'>
                    Регистрация
                </Typography>
            </div>
        </div>
    )
};

export default StartPage;