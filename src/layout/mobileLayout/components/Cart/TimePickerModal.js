import React, {useState} from "react";
import {Modal, Box, Button} from '@mui/material';
import moment from "moment";
import s from './Cart.module.scss';

import {Timeit} from "react-timeit";

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: '300px',
    bgcolor: 'background.paper',
    boxShadow: 'none',
    p: 4,
    textAlign: 'center',
    color: '#000000',
    backgroundColor: '#F6FCFE',
};

const TimePickerModal = ({open, handleClose, handleOpen, time, setTime}) => {

    const format = 'HH:mm';

    const changePickerTime = (evt) => {
        const fulltime = moment();
        fulltime.set('hour', evt.split(':')[0]);
        fulltime.set('minute', evt.split(':')[1]);
        setTime(fulltime.toDate());
        console.log(evt)
    }

    return (
        <div>

            <div className={s.timePicker} onClick={handleOpen}>
                {moment(time).format('HH:mm')}
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='mb-auto'>
                        <Timeit defualtValue={moment(time).format(format)} onChange={changePickerTime}/>
                    </div>
                    <Button className='btn border-dark' onClick={handleClose}>
                        OK
                    </Button>
                </Box>
            </Modal>
        </div>
    )
};

export default TimePickerModal;