import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {connect} from "react-redux";
import moment from "moment";

const Order = ({ order }) => {

    const [status, setStatus] = useState(null);
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await fetch(`https://cofefu.ru/api/order_status/${order.number}`).then(res => res.json());
                if (res.status === 400 ) {
                    setStatus('noOrder')
                } else {
                    setStatus(res)
                }
            } catch (e) {
                console.log(e);
            }
        }

        if (order.number) {
            checkStatus();
            setInterval(checkStatus, 60000)
        }
    }, [status])

    if (!order.number || status === 'noOrder') {
        return (
            <div>
                <div className='mb65-container d-flex flex-column align-items-center justify-content-center height-100'>
                    <Typography variant={'h5'}>
                        Нет активного заказа
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
                        Активный заказ
                    </Typography>
                </div>
                <div className='mt-3 mb-3 d-flex justify-content-center align-items-center flex-column'>
                    <Typography variant='body1'>
                        Номер заказа
                    </Typography>
                    <Typography variant='h1'>
                        { order.number }
                    </Typography>
                </div>
                <div className='mt-3 mb-3 d-flex justify-content-center align-items-center flex-column'>
                    <Typography variant='body1'>
                        Статус заказа
                    </Typography>
                    <Typography variant='h3'>
                        { status }
                    </Typography>
                </div>

                {
                    status !== 'Принят' ? <></>
                        : (<div className='mt-3 mb-3 d-flex justify-content-center align-items-center flex-column'>
                            <Typography variant='body1'>
                                Будет готов к
                            </Typography>
                            <Typography variant='h5'>
                                { moment(order.time).format('HH:MM') }
                            </Typography>
                        </div>)
                }
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
)(Order);