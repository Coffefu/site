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

const CoffeeHouseModal = ({ coffeeHouses, changeCoffeeHouse }) => {

   const navigate = useNavigate();
   const handleClose = () => {
      navigate(-1);
   }

   const changeActiveCoffeeHouse = (cf) => {
      changeCoffeeHouse(cf);
      handleClose();
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
                                 {coffeeHouse.name}
                              </Typography>
                              <Typography sx={{ fontSize: 15 }} gutterBottom>
                                 расположение {coffeeHouse.placement}, <br />
                                 {
                                    coffeeHouse.open_time
                                       ? (
                                          `время работы ${coffeeHouse.open_time.slice(0, 5)} - ${coffeeHouse.close_time.slice(0, 5)}`
                                       ) : ('Кафе закрыто')
                                 }
                              </Typography>
                           </CardContent>
                        </Card>
                     )
                  })
               }
            </div>

         </Box>
      </Modal>
   )
};

const mapStateToProps = state => ({
   coffeeHouse: state.user.coffeeHouse,
   coffeeHouses: state.menu.coffeeHouses,
});

const mapDispatchToProps = {
   changeCoffeeHouse: userStore.changeCoffeeHouse,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(CoffeeHouseModal);