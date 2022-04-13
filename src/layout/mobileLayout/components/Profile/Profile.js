import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, CircularProgress, List, ListItem, ListItemButton, Modal, Typography } from "@mui/material";
import { connect } from "react-redux"
import s from "./Profile.module.scss"
import ActiveOrder from "./ActiveOrder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCookies } from "react-cookie";

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

const Profile = ({ order }) => {

    const [cookies, setCookie] = useCookies(["jwt"]);

    const verifyPhone = () => {
        const newWindow = window.open('https://t.me/cofefu_bot', '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getCustomer = async () => {
            try {
                const res = await fetch(`https://cofefu.ru/api/me`,
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

    const [status, setStatus] = useState(null);
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await fetch(`https://cofefu.ru/api/order_status/${order.number}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'jwt-token': cookies.jwt
                        }
                    }).then(res => res.json());
                if (res.status === 400 || res.detail === 'Invalid order number' || res.status === 422) {
                    setStatus('noOrder')
                } else {
                    setStatus(res)
                }
            } catch (e) {
                console.log(e);
            }
        }

        if (order.number || status !== 'noOrder') {
            checkStatus();
            setInterval(checkStatus, 60000)
        }
    }, [status])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const closeModal = () => {
        handleClose();
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
                <div className='d-flex flex-column justify-content-center'>
                    <Typography variant='h5'>
                        Привет, {profile.name} !
                    </Typography>
                    <Typography variant='subtitle1'>
                        +7{profile.phone_number}
                    </Typography>
                </div>

                <div className='d-flex flex-column justify-content-center'>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleOpen}>
                                Активный заказ
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                История заказов
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={verifyPhone}>
                                Подтвердить телефон
                            </ListItemButton>
                        </ListItem>
                    </List>
                </div>
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
                    <ActiveOrder order={order} status={status} />
                </Box>
            </Modal>
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