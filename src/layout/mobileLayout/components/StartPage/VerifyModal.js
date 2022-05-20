import React, { useState } from "react";
import moment from "moment";
import { useCookies } from "react-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactCodeInput from "react-verification-code-input";
import { Alert, Box, Button, IconButton, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { usePopup } from 'react-hook-popup';

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

const VerifyModal = ({ showErrorPopup, showSuccessPopup }) => {

   const navigate = useNavigate();
   const [cookies, setCookie] = useCookies(["jwt"]);
   const [code, setCode] = useState('');
   const [open, setOpen] = React.useState(true);
   const handleClose = () => setOpen(false);
   const closeModal = () => {
      navigate(-1);
      const handleClose = () => setOpen(false);
   }

   const changeCode = (event) => {
      setCode(event);
   }

   const verify = () => {
      if (code.length < 6) {
         showErrorPopup('Код заполнен не полностью.')
         return;
      }

      const sendVerifyCode = async () => {
         try {
            const request = await fetch(`https://cofefu.ru/dev/api/verify_login_code?code=${code}`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json'
               }
            })
            const response = await request.json();
            if (response.detail) {
               showErrorPopup(response.detail)
            } else {
               showSuccessPopup('Успешный вход.')
               setCookie('jwt', response,
                  {
                     path: '/',
                     expires: new Date(moment().add(15, 'd').format()),
                  });
               navigate('/mobile/menu');
               window.location.reload();
            }
         } catch (e) {
            console.log(e)
         }
      }

      sendVerifyCode();
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
               <div className='d-flex justify-content-start h6'>
                  <IconButton aria-label="delete" onClick={closeModal} className='p-0'>
                     <ArrowBackIcon color='#000000' sx={{ fontSize: 32 }} />
                  </IconButton>
               </div>

               <Typography className='mb-3' id="modal-modal-title" variant="h4" component="h2">
                  Введите код потверждения
               </Typography>

               <div className="p-3 d-flex flex-column align-items-center justify-content-between">
                  <ReactCodeInput
                     type="number"
                     fields={6}
                     value={code}
                     onChange={changeCode} />
               </div>

               <div className='mt-auto d-flex justify-content-center'>
                  <Button sx={{ border: '1px solid black', color: '#c28760' }} onClick={verify}
                     className={"btn"}>
                     подтвердить
                  </Button>
               </div>
            </Box>
         </Modal>
      </>
   )
};

export default VerifyModal;