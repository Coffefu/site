import React, { useState } from 'react'
import Card from '@mui/material/Card';
import { Box, Button, CardContent, Modal, Typography, Snackbar, Alert } from '@mui/material';

import s from './MenuList.module.scss'

const MenuListItem = ({ item }) => {

   const addons = [
      {
         'title': 'Корица',
         'value': 'cinnamon',
      },
      {
         'title': 'Мёд',
         'value': 'honey',
      },
      {
         'title': 'С. карамель',
         'value': 'caramel',
      },
      {
         'title': 'фундук',
         'value': 'hazelnuts',
      },
   ]

   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [count, setCount] = useState(1)
   const handleCountChange = (type) => {

      if (type === 'minus' && count > 1) {
         setCount(count - 1);
         setSum(item.price * (count - 1));
      }
      if (type === 'plus' && count < 10) {
         setCount(count + 1)
         setSum(item.price * (count + 1));
      }
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
      for (let i = 0; i < count; i += 1) {
         cart.push({ ...item, price: sum, addon: addon });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      setOpenSuccessAlert(true);
      setOpen(false);
   }

   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 320,
      bgcolor: 'background.paper',
      border: '1px solid #f7a818',
      boxShadow: 'none',
      p: 4,
      borderRadius: '10px',
      textAlign: 'center'
   };

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
                     <p className='card-text'>
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
               <div className='d-flex justify-content-end h6' onClick={handleClose}>
                  <span>X</span>
               </div>

               <Typography className='mb-3' id="modal-modal-title" variant="h4" component="h2">
                  {item.name}
               </Typography>

               <div className="mb-3 d-flex align-items-center justify-content-between">
                  <Typography variant='h6'>
                     Количество
                  </Typography>

                  <div className={s.quantity_inner}>
                     <button className={s.bt_minus} onClick={() => handleCountChange('minus')}>
                        <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                     </button>
                     <input onChange={() => { return false; }} className={s.quantity} type="text" value={count} size="2" data-max-count="20" />
                     <button className={s.bt_plus} onClick={() => handleCountChange('plus')}>
                        <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                     </button>
                  </div>
               </div>

               <div className="mb-3 d-flex align-items-center justify-content-between">
                  <Typography variant='h6'>
                     Размер
                  </Typography>

                  <div className={'d-flex align-items-center'}>
                     <div className={s.sizeCheckbox} data-size='S' onClick={changeSize}>
                        S
                     </div>
                     <div className={s.sizeCheckbox} data-size='M' onClick={changeSize}>
                        M
                     </div>
                  </div>

               </div>

               <div className="mb-3 d-flex align-items-center justify-content-between">
                  <Typography variant='h6'>
                     Добавки
                  </Typography>
               </div>

               <div className={'d-flex flex-wrap align-items-center' + s.addonWrapper}>
                  {addons.map((addon, index) => {
                     return (
                        <div key={index} className={s.addonCheckbox} data-addon={addon.value} onClick={changeAddon}>
                           {addon.title}
                        </div>
                     )
                  })}
               </div>

               <Typography variant='h5' className='mb-2 mt-3'>
                  Итого: {sum} руб.
               </Typography>

               <Button onClick={addProduct} className={"btn " + s.productAdd}>Добавить</Button>
            </Box>
         </Modal>

         <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openErrorAlert}
            onClose={handleCloseAlert}
            key='errorAlert'
         >
            <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
               Вы не выбрали размер
            </Alert>
         </Snackbar>
         <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSuccessAlert}
            onClose={handleCloseAlert}
            key='successAlert'
            autoHideDuration={6000}
         >
            <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
               Продукт добавлен в вашу корзину
            </Alert>
         </Snackbar>
      </div>
   )
}

export default MenuListItem;