import React, {useEffect, useState} from "react";
import {Modal, Box, Button} from '@mui/material';
import moment from "moment";
import s from './Cart.module.scss';

import {Timeit} from "react-timeit";
import { useSwipeable } from "react-swipeable";

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
    }

    const sliders = document.getElementsByClassName('timeit-control-0-1-2');
    const controls = document.getElementsByClassName('timeit-control__time-0-1-3');
    const changeTime = (swipe) => {
        if (swipe.dir === 'Up') {
            if (swipe.event.path.indexOf(sliders[0]) !== -1) {
                setTime(moment(time).add(1, 'hour').toDate());
                controls[1].click();
            }
            if (swipe.event.path.indexOf(sliders[1]) !== -1) {
                setTime(moment(time).add(1, 'minute').toDate());
                controls[3].click();
            }
        }
        if (swipe.dir === 'Down') {
            if (swipe.event.path.indexOf(sliders[0]) !== -1) {
                setTime(moment(time).add(-1, 'hour').toDate());
                controls[0].click();
            }
            if (swipe.event.path.indexOf(sliders[1]) !== -1) {
                setTime(moment(time).add(-1, 'minute').toDate());
                controls[2].click();
            }
        }
    }

    const handlers = useSwipeable({
        onSwiped: (eventData) => changeTime(eventData),
    });

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
                    <div className='mb-auto' {...handlers}>
                        <Timeit value={moment(time).format(format)} defualtValue={moment(time).format(format)} onChange={changePickerTime}/>
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