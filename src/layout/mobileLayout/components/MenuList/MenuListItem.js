import React, {useState} from 'react'
import Card from '@mui/material/Card';
import {Box, Button, CardContent, Modal, Typography, Snackbar, Alert, IconButton} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import s from './MenuList.module.scss'

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

const MenuListItem = ({item, addons}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const closeModal = () => {
        setSize('');
        setAddon('');
        handleClose();
    }

    const [size, setSize] = useState('');
    const changeSize = (evt) => {
        setSize(evt.target.getAttribute('data-size'));
        const checkboxes = document.getElementsByClassName(s.sizeCheckbox);
        for (let checkbox of checkboxes) {
            checkbox.classList.remove(s.activeSize);
        }
        evt.target.classList.add(s.activeSize);
    }

    const [addon, setAddon] = useState('');
    const changeAddon = (evt) => {
        setAddon(evt.target.getAttribute('data-addon'));
        const checkboxes = document.getElementsByClassName(s.addonCheckbox);
        for (let checkbox of checkboxes) {
            checkbox.classList.remove(s.activeAddon);
        }
        evt.target.classList.add(s.activeAddon);
    }

    const [sum, setSum] = useState(item.price);

    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
    };

    const addProduct = () => {
        if (size === '') {
            setOpenErrorAlert(true);
            return;
        }
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push({...item, price: sum, addon: addon});
        localStorage.setItem('cart', JSON.stringify(cart));
        setOpenSuccessAlert(true);
        closeModal();
    }

    return (
        <div className={'row card mb-4'}>
            <Card onClick={handleOpen} className={s.menuItemCard}>
                <CardContent className='card-body'>
                    <div className='row'>
                        <div className='col'>
                            <h5 className='card-title'>
                                {item.name}
                            </h5>
                            <p className='card-text'>
                                {item.description}
                            </p>
                        </div>
                        <div className='col d-flex justify-content-end'>
                            <p className='card-text font-weight-bold'>
                                {item.price} руб.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='d-flex justify-content-start h6'>
                        <IconButton aria-label="delete" onClick={closeModal} className='p-0'>
                            <ArrowBackIcon color='#000000'/>
                        </IconButton>
                    </div>

                    <Typography className='mb-3' id="modal-modal-title" variant="h4" component="h2">
                        {item.name}
                    </Typography>

                    <div className="mb-3 d-flex flex-column align-items-center justify-content-between">
                        <div className='mb-2'>
                            <Typography variant='h6'>
                                Размер
                            </Typography>
                        </div>

                        <div className={'d-flex align-items-center'}>
                            <div className={s.sizeCheckbox} data-size='S' onClick={changeSize}>
                                S
                            </div>
                            <div className={s.sizeCheckbox} data-size='M' onClick={changeSize}>
                                M
                            </div>
                        </div>

                    </div>

                    <div className="mb-3 d-flex align-items-center justify-content-between flex-column">
                        <Typography variant='h6'>
                            Добавки
                        </Typography>
                    </div>

                    <div className={'d-flex justify-content-center flex-wrap align-items-center mb-auto ' + s.addonWrapper}>
                        {addons.map((addon, index) => {
                            return (
                                <div key={index} className={s.addonCheckbox} data-addon={addon.id}
                                     onClick={changeAddon}>
                                    {addon.name}
                                </div>
                            )
                        })}
                    </div>

                    <div className='d-flex justify-content-center'>
                        <Button sx={{border: '1px solid black', color: '#c28760'}} onClick={addProduct}
                                className={"btn " + s.productAdd}>
                            В корзину {sum + ' руб.'}
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={openErrorAlert}
                onClose={handleCloseAlert}
                key='errorAlert'
            >
                <Alert onClose={handleCloseAlert} severity="error" sx={{width: '100%'}}>
                    Вы не выбрали размер
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={openSuccessAlert}
                onClose={handleCloseAlert}
                key='successAlert'
                autoHideDuration={6000}
            >
                <Alert onClose={handleCloseAlert} severity="success" sx={{width: '100%'}}>
                    Продукт добавлен в вашу корзину
                </Alert>
            </Snackbar>
        </div>
    )
}

export default MenuListItem;