import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Modal,  Select, Button } from '@mui/material';
import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import s from "./Profile.module.scss"
import {useCookies} from "react-cookie";

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

const OrderFeedbackModal = ({ showErrorPopup, showSuccessPopup }) => {

   const navigate = useNavigate();
   const [cookies, setCookie] = useCookies(["jwt"]);
   const [openFeedback, setOpenFeedback] = useState(true);
   const handleCloseFeedback = () => setOpenFeedback(false);
   const closeModal = () => {
      handleCloseFeedback();
      navigate(-1)
   }

   const [type, setType] = React.useState('feedback');

   const handleChange = (event) => {
      setType(event.target.value);
   };

   const [text, setText] = useState('');
   const handleText = (evt) => {
      setText(evt.target.value);
   }
   const sendFeedback = () => {
      if (text === '') {
         showErrorPopup('Сообщение не можеть быть пустым!');
         return;
      }

      if (type === 'feedback') {

         const sendFeedback = async () => {
            try {
               const request = await fetch('https://cofefu.ru/dev/api/feedback', {
                  method: 'POST',
                  body: JSON.stringify(text),
                  headers: {
                     'Content-Type': 'application/json',
                     'jwt-token': cookies.jwt
                  }
               })
               showSuccessPopup('Спасибо за ваш отзыв!')
            } catch (e) {
               console.log(e)
            }
         }

         sendFeedback();
      }
      if (type === 'bug') {

         const sendBug = async () => {
            try {
               const request = await fetch('https://cofefu.ru/dev/api/bugreport', {
                  method: 'POST',
                  body: JSON.stringify(text),
                  headers: {
                     'Content-Type': 'application/json',
                     'jwt-token': cookies.jwt
                  }
               })
               showSuccessPopup('Спасибо за ваш отзыв!')
            } catch (e) {
               console.log(e)
            }
         }

         sendBug();
      }
   }

   return (
      <Modal
         open={true}
         onClose={handleCloseFeedback}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
            <div className='d-flex justify-content-start h6'>
               <IconButton aria-label="delete" onClick={closeModal} className='p-0' >
                  <ArrowBackIcon color='#000000' sx={{ fontSize: 32 }} />
               </IconButton>
            </div>

            <FormControl
               sx={{ m: 1, minWidth: 120 }}
               size="small"
               className={"d-flex flex-column mt-5 " + s.fillHeight}
            >
               <InputLabel id="type">Вид сообщения</InputLabel>
               <Select
                  labelId="type"
                  id="type"
                  value={type}
                  onChange={handleChange}
                  label="Вид сообщения"
               >
                  <MenuItem value={'feedback'}>Отзыв</MenuItem>
                  <MenuItem value={'bug'}>Баг</MenuItem>
               </Select>
               <TextField
                  onChange={handleText}
                  className='mt-5 mb-auto'
                  id="feedback-text"
                  label="Сообщение отзыва"
                  variant="outlined"
                  multiline
                  minRows={2}
                  value={text}
               />

               <Button sx={{ border: '1px solid black', color: '#c28760' }}
                  className={"btn"}
                  onClick={sendFeedback}
               >
                  отправить
               </Button>
            </FormControl>
         </Box>
      </Modal>
   )
};

export default OrderFeedbackModal;

