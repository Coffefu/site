import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';

import s from './MenuList.module.scss';
import { Box, Button, Modal, Typography, Snackbar, Alert, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

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

const MenuListItemModal = ({ menu, addons, showErrorPopup, showSuccessPopup }) => {

   const navigate = useNavigate();
   let { productId } = useParams();
   const [open, setOpen] = React.useState(true);
   useEffect(() => {
      if (menu.length === 0) {
         navigate('/mobile/menu');
         return;
      }
      setSum(item.variations[0].price);
      setSize({
         size: item.variations[0].size,
         price: item.variations[0].price,
         id: item.variations[0].id,
      })
   }, [])

   const item = menu.filter(item => {
      return +item.id === +productId;
   })[0];

   const handleClose = () => setOpen(false);
   const closeModal = () => {
      setAddon({
         id: null,
         price: 0
      });
      setSize({
         size: item.variations[0].size,
         price: item.variations[0].price,
         id: item.variations[0].id,
      });

      setSum(+item.variations[0].price);
      handleClose();
      navigate(-1);
   }

   const [sum, setSum] = useState(null);


   const sizes = ['S', 'M', 'L'];
   const [size, setSize] = useState(null);
   const changeSize = (evt) => {
      setSize({
         size: +evt.target.getAttribute('data-size'),
         price: +evt.target.getAttribute('data-price'),
         id: evt.target.getAttribute('data-id'),
      });
      setSum(+evt.target.getAttribute('data-price') + (+addon.reduce((a, b) => a += b.price , 0) || 0));
      const checkboxes = document.getElementsByClassName(s.sizeCheckbox);
      for (let checkbox of checkboxes) {
         checkbox.classList.remove(s.activeSize);
      }
      evt.target.classList.add(s.activeSize);
   }

   const [addon, setAddon] = useState([]);
   const changeAddon = (evt) => {
      if (addon.map(item => item.id).includes(+evt.target.getAttribute('data-addon'))) {
         const filteredAddons = [...addon.filter(item => item.id !== +evt.target.getAttribute('data-addon'))];
         setAddon(filteredAddons);
         setSum(+size.price + filteredAddons.reduce((a, b) => a += b.price , 0));
         const checkboxes = document.getElementsByClassName(s.addonCheckbox);
         for (let checkbox of checkboxes) {
            if (+checkbox.getAttribute('data-addon') === +evt.target.getAttribute('data-addon') ) {
               checkbox.classList.remove(s.activeAddon);
            }
         }
         return;
      }
      setAddon([...addon, {
         id: +evt.target.getAttribute('data-addon'),
         price: +evt.target.getAttribute('data-price')
      }]);
      setSum(+size.price + +evt.target.getAttribute('data-price') + addon.reduce((a, b) => a += b.price , 0));
      const checkboxes = document.getElementsByClassName(s.addonCheckbox);
      for (let checkbox of checkboxes) {
         if (!addon.map(item => item.id).includes(+checkbox.getAttribute('data-addon'))) {
            checkbox.classList.remove(s.activeAddon);
         }
      }
      evt.target.classList.add(s.activeAddon);
   }

   const addProduct = () => {
      if (size === '') {
         showErrorPopup('Размер не выбран!')
         return;
      }
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({ ...item, price: sum, addon: addon, id: size.id });
      localStorage.setItem('cart', JSON.stringify(cart));
      showSuccessPopup('Продукт добавлен в вашу корзину.');
      closeModal();
   }

   if (menu.length === 0) {
      return (
         <div>
            <CircularProgress color="success" />
         </div>
      )
   }

   return (
      <>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <div className='d-flex justify-content-start'>
                  <IconButton aria-label="delete" onClick={closeModal} className='p-0'>
                     <ArrowBackIcon color='#000000' sx={{ fontSize: 32 }} />
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
                     {
                        item.variations.map((item, index) => {
                           if (index === 0) {
                              return (
                                 <div
                                    key={index}
                                    className={s.sizeCheckbox + ' ' + s.activeSize}
                                    data-size={item.size}
                                    onClick={changeSize}
                                    data-price={item.price}
                                    data-id={item.id}
                                 >
                                    {sizes[item.size]}
                                 </div>
                              )
                           }
                           return (
                              <div
                                 key={index}
                                 className={s.sizeCheckbox}
                                 data-size={item.size}
                                 onClick={changeSize}
                                 data-price={item.price}
                                 data-id={item.id}
                              >
                                 {sizes[item.size]}
                              </div>
                           )
                        })
                     }
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
                        <div key={index}
                           className={s.addonCheckbox}
                           data-addon={addon.id}
                           onClick={changeAddon}
                           data-price={addon.price}
                        >
                           {addon.name}
                        </div>
                     )
                  })}
               </div>

               <div className='d-flex justify-content-center mt-3'>
                  <Button sx={{ border: '1px solid black', color: '#c28760' }} onClick={addProduct}
                     className={"btn " + s.productAdd}>
                     В корзину {sum} руб.
                  </Button>
               </div>
            </Box>
         </Modal>
      </>
   )
};

const mapStateToProps = state => ({
   menu: state.menu.menu,
   addons: state.menu.addons,
});

export default connect(
   mapStateToProps,
   {}
)(MenuListItemModal);