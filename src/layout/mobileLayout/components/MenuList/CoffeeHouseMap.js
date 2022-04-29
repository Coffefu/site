import React from "react";
import { Box, CardContent, Modal, Typography, IconButton, Card, InputBase, Drawer } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import userStore from './../../../../store/modules/userStore';
import { connect } from 'react-redux';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
   color: '#000000',
   backgroundColor: '#F6FCFE',
};

const CoffeeHouseMap = () => {

   const navigate = useNavigate();
   const handleClose = () => {
      navigate(-1);
   }

   return (
      <Modal
         open={true}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
            <div className='d-flex justify-content-start h6'>
               <IconButton aria-label="delete" onClick={handleClose} className='p-0' >
                  <ArrowBackIcon color='#000000' sx={{ fontSize: 32 }} />
               </IconButton>
            </div>
            <Typography className={'mb-2'} id="modal-modal-title" variant="h6" component="h2">
               Карта кофеен
            </Typography>
            <div id="modal-modal-description">
               Для того, чтобы найти нужную кофейню, нужно воспользоваться поиском в боковом меню.
               <div>
                  <Typography sx={{ fontSize: 24, marginTop: 4, color: '#000000' }}>
                     <a href='https://fefumap.ru/' rel="noopenner norefferer" target='_blank'>
                        fefumap
                     </a>
                  </Typography>
               </div>
            </div>

         </Box>
      </Modal>
   )
};

export default CoffeeHouseMap;