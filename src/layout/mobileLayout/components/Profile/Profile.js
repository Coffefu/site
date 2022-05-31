import React, { useEffect, useState } from "react";
import { CircularProgress, List, ListItem, ListItemButton, Typography, ListItemIcon } from "@mui/material";
import { connect } from "react-redux"
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';

const { REACT_APP_ENVIRONMENT } = process.env;

const Profile = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
    const navigate = useNavigate();

    const [openHistory, setOpenHistory] = React.useState(false);
    const handleOpenHistory = () => {
        navigate('/mobile/profile/history');
    };
    const handleCloseHistory = () => setOpenHistory(false);
    const [openFeedback, setOpenFeedback] = React.useState(false);
    const handleOpenFeedback = () => {
        navigate('/mobile/profile/feedback');
    }
    const handleCloseFeedback = () => setOpenFeedback(false);
    const closeModal = () => {
        handleCloseHistory();
        handleCloseFeedback();
    }

    const verifyPhone = () => {
        const newWindow = window.open('https://t.me/cofefu_bot')
        if (newWindow) newWindow.opener = null
    }

    const [profile, setProfile] = useState(null);
    useEffect(() => {
        const getCustomer = async () => {
            try {
                const res = await fetch(`https://cofefu.ru${REACT_APP_ENVIRONMENT || ''}/api/me`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'jwt-token': cookies.jwt
                        }
                    }).then(res => res.json());
                setProfile(res);
            } catch (e) {
                console.log(e);
            }
        }

        if (!profile) {
            getCustomer();
        }
    }, [profile])

    let isConfirmed = false;
    useEffect(() => {
        const getCustomer = async () => {
            try {
                const res = await fetch(`https://cofefu.ru${REACT_APP_ENVIRONMENT || ''}/api/is_confirmed`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'jwt-token': cookies.jwt
                        }
                    }).then(res => res.json());
                isConfirmed = res;
            } catch (e) {
                console.log(e);
            }
        }

        if (!profile) {
            getCustomer();
        }
    }, [profile])

    const [orders, setOrders] = useState(null);
    useEffect(() => {
        const getOrdersHistory = async () => {
            try {
                const res = await fetch(`https://cofefu.ru${REACT_APP_ENVIRONMENT || ''}/api/my_orders`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'jwt-token': cookies.jwt
                        }
                    }).then(res => res.json());

                setOrders(res);
            } catch (e) {
                console.log(e);
            }
        }

        getOrdersHistory();
    }, [])

    const changeName = () => {
        navigate('/mobile/profile/changeName');
    }

    const handleLogout = () => {

        removeCookie('jwt');
        navigate('/login');
    }

    if (!profile) {
        return (
            <div className='mb65-container d-flex flex-column justify-content-center align-items-center height-100'>
                <CircularProgress color="success" />
            </div>
        )
    }
    return (
        <div>
            <div className='mb65-container d-flex flex-column'>
                <div className='mt-3 mb-3 d-flex align-items-center justify-content-center'>
                    <Typography variant='subtitle1'>
                        Мой cofefu
                    </Typography>
                </div>
                <div className='pl-3 d-flex flex-column justify-content-center'>
                    <Typography variant='h5'>
                        Привет, {profile.name} !
                        <EditIcon sx={{ paddingBottom: '3px', marginLeft: '5px'}} onClick={changeName}/>
                    </Typography>
                    <Typography variant='subtitle1'>
                        +7{profile.phone_number}
                    </Typography>
                </div>

                <div className='d-flex flex-column justify-content-center'>
                    <List sx={{ fontSize: 20 }}>
                        <ListItem className="d-flex justify-content-between" disablePadding divider>
                            <ListItemButton onClick={handleOpenHistory}>
                                История заказов
                            </ListItemButton>
                            <ListItemIcon>
                                <ArrowForwardIcon sx={{ fontSize: 24 }} />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem className="d-flex justify-content-between" disablePadding divider>
                            <ListItemButton onClick={handleOpenFeedback}>
                                Обратная связь
                            </ListItemButton>
                            <ListItemIcon>
                                <ArrowForwardIcon sx={{ fontSize: 24 }} />
                            </ListItemIcon>
                        </ListItem>
                        {
                            !isConfirmed
                            ? (<ListItem className="d-flex justify-content-between" disablePadding divider>
                                    <ListItemButton onClick={verifyPhone}>
                                        Подтвердить телефон
                                    </ListItemButton>
                                    <ListItemIcon>
                                        <ArrowForwardIcon sx={{ fontSize: 24 }} />
                                    </ListItemIcon>
                                </ListItem>) : <></>
                        }
                        <ListItem className="d-flex justify-content-between" disablePadding divider>
                            <ListItemButton onClick={handleLogout}>
                                Выйти с аккаунта
                            </ListItemButton>
                            <ListItemIcon>
                                <ArrowForwardIcon sx={{ fontSize: 24 }} />
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    order: state.user.order,
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
