import React from 'react'
import { Box, CardContent, Modal, Typography, IconButton, Card } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';

import s from './MenuList.module.scss';

const TopHeader = ({ coffeeHouse, coffeeHouses, changeActiveCoffeeHouse, handleClose, handleOpen, open }) => {


   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      maxHeight: 400,
      overflow: 'auto',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      borderRadius: '5px',
   };

   return (
      <div className={s.headerWrapper}>
         <div className={'col mb-3 mt-3 d-flex justify-content-between align-items-center'}>
            <IconButton
               size="large"
               edge="start"
               color="inherit"
               aria-label="open drawer"
            >
               <MenuIcon />
            </IconButton>

            <Typography
               variant="h5"
               noWrap
               component="span"
               className='d-flex justify-content-center'
               sx={{ flexGrow: 1, display: { sm: 'block' }, color: '#6F4E37', fontSize: 24 }}
            >
               Coffefu
            </Typography>

            <Avatar sx={{ color: '#f2cd9f', backgroundColor: '#6f4e37' }} />
         </div>
         <div className={s.headerPlace + ' col mb-3 mt-3'}>
            <div className='d-flex align-item-center justify-content-start'>
               <span className={s.title + ' mr-3'}>Заберу из</span>
               <span className={s.subtitle} onClick={handleOpen}> {coffeeHouse.short} </span>

               <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
               >
                  <Box sx={style}>
                     <Typography id="modal-modal-title" variant="h6" component="h2">
                        Выберите место, откуда будете забирать заказ
                     </Typography>
                     <div id="modal-modal-description">
                        {
                           coffeeHouses.map((coffeeHouse, index) => {
                              return (
                                 <Card key={index} id={coffeeHouse.id} className={'mb-4 border'}
                                    onClick={() => changeActiveCoffeeHouse(coffeeHouse)}>
                                    <CardContent>
                                       <Typography variant="h5" component="div">
                                          {coffeeHouse.title}
                                       </Typography>
                                       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                          {coffeeHouse.address}
                                       </Typography>
                                    </CardContent>
                                 </Card>
                              )
                           })
                        }
                     </div>

                  </Box>
               </Modal>
            </div>
         </div>
      </div>
   )
}

export default TopHeader;