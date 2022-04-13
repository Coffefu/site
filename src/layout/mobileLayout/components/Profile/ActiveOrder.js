import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { connect } from "react-redux";
import moment from "moment";

const ActiveOrder = ({ order, status }) => {

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
                        {order.number}
                    </Typography>
                </div>
                <div className='mt-3 mb-3 d-flex justify-content-center align-items-center flex-column'>
                    <Typography variant='body1'>
                        Статус заказа
                    </Typography>
                    <Typography variant='h3'>
                        {status}
                    </Typography>
                </div>

                {
                    status !== 'Принят' ? <></>
                        : (<div className='mt-3 mb-3 d-flex justify-content-center align-items-center flex-column'>
                            <Typography variant='body1'>
                                Будет готов к
                            </Typography>
                            <Typography variant='h5'>
                                {moment(order.time).format('HH:mm')}
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
)(ActiveOrder);