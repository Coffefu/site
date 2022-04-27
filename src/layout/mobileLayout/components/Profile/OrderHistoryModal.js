import React, { useState, useEffect } from "react";
import { Modal } from '@mui/material';
import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OrdersHistory from "./OrdersHistory";
import { CircularProgress } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

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

const OrderHistoryModal = () => {

   const navigate = useNavigate();
   const [cookies, setCookie] = useCookies(["jwt"]);
   const [openHistory, setOpenHistory] = React.useState(false);
   const handleOpenHistory = () => setOpenHistory(true);
   const handleCloseHistory = () => setOpenHistory(false);

   const closeModal = () => {
      handleCloseHistory();
      navigate(-1)
   }

   const [orders, setOrders] = useState(null);
   useEffect(() => {
      const getOrdersHistory = async () => {
         try {
            const res = await fetch(`https://cofefu.ru/api/my_orders`,
               {
                  method: 'GET',
                  headers: {
                     'Content-Type': 'application/json',
                     'jwt-token': cookies.jwt
                  }
               }).then(res => res.json());

            setOrders(res);
         } catch (e) {
            console.log(e);
         }
      }

      getOrdersHistory();
   }, [])

   if (!orders) {
      return (
         <div className='mb65-container d-flex flex-column justify-content-center align-items-center height-100'>
            <CircularProgress color="success" />
         </div>
      )
   }

   return (
      <Modal
         open={true}
         onClose={handleCloseHistory}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
            <div className='d-flex justify-content-start h6'>
               <IconButton aria-label="delete" onClick={closeModal} className='p-0'>
                  <ArrowBackIcon color='#000000' />
               </IconButton>
            </div>
            <OrdersHistory orders={orders} />
         </Box>
      </Modal>
   )
};

export default OrderHistoryModal;

