import React from "react";
import {Modal, Box} from '@mui/material';
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

    const changeTime = (time) => {
        setTime(time);
    }

    console.log(time);

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
                    <div>
                        <Timeit/>
                    </div>
                </Box>
            </Modal>
        </div>
    )
};

export default TimePickerModal;