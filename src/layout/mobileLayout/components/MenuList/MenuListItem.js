import React, { useState } from 'react'
import Card from '@mui/material/Card';
import { Box, Button, CardContent, Modal, Typography } from '@mui/material';

const MenuListItem = ({ item }) => {

   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [count, setCount] = useState(1)

   const handleCountChange = (evt) => {
      setCount((evt.target.validity.valid) && (evt.target.value > 0 && evt.target.value < 10) ?
         evt.target.value : count)
   }

   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      borderRadius: '10px',
      textAlign: 'center'
   };

   return (
      <div className='row card m-2'>
         <Card className='menu-item-card'>
            <CardContent className='card-body'>
               <h5 className='card-title'>
                  {item.name}
               </h5>
               <p className='card-text'>
                  Идеально прожаренные зерна кофе подарят вам прекрасный заряд бодрости
               </p>
               <Button onClick={handleOpen} className="btn btn-primary">Добавить в корзину</Button>
            </CardContent>
         </Card>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  {item.name}
               </Typography>
               <Typography>
                  Количество
               </Typography>
               <div className="input-group mb-3 menu-modal-input">
                  <input
                     type="text"
                     pattern="[0-9]*"
                     className="form-control"
                     aria-label="count"
                     aria-describedby="basic-addon1"
                     onInput={handleCountChange.bind(this)}
                     value={count} />
               </div>
               <Typography>
                  Уровень сахара
               </Typography>
               <div className="input-group mb-3 menu-modal-input">
                  <input
                     type="text"
                     pattern="[0-9]*"
                     className="form-control"
                     aria-label="count"
                     aria-describedby="basic-addon1"
                     onInput={handleCountChange.bind(this)}
                     value={count} />
               </div>
               <Typography>
                  Размер стакана
               </Typography>
               <div className="input-group mb-3 menu-modal-input">
                  <input
                     type="text"
                     pattern="[0-9]*"
                     className="form-control"
                     aria-label="count"
                     aria-describedby="basic-addon1"
                     onInput={handleCountChange.bind(this)}
                     value={count} />
               </div>
            </Box>
         </Modal>
      </div>
   )
}

export default MenuListItem;