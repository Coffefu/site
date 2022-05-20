import React, { useEffect, useState } from "react";
import { Box, IconButton, CircularProgress, List, ListItem, ListItemButton, Modal, Typography, ListItemIcon } from "@mui/material";
import { connect } from "react-redux"
import s from "./Profile.module.scss"
import { useCookies } from "react-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
    color: '#000000',
    backgroundColor: '#F6FCFE',
};

const Profile = () => {

    const [cookies, setCookie] = useCookies(["jwt"]);
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
                const res = await fetch(`https://cofefu.ru/dev/api/me`,
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
                const res = await fetch(`https://cofefu.ru/dev/api/is_confirmed`,
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
                const res = await fetch(`https://cofefu.ru/dev/api/my_orders`,
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
                            isConfirmed
                            ? (<ListItem className="d-flex justify-content-between" disablePadding divider>
                                    <ListItemButton onClick={verifyPhone}>
                                        Подтвердить телефон
                                    </ListItemButton>
                                    <ListItemIcon>
                                        <ArrowForwardIcon sx={{ fontSize: 24 }} />
                                    </ListItemIcon>
                                </ListItem>) : <></>
                        }
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