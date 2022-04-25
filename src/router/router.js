import React from "react";
import { history } from './../common/components/history';
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate
} from 'react-router-dom';
import MobileLayout from "../layout/mobileLayout";
import StartPage from "../layout/mobileLayout/components/StartPage";
import VerifyModal from "../layout/mobileLayout/components/StartPage/VerifyModal";
import { ConnectedMenuList } from "../layout/mobileLayout/components/MenuList/MenuList";
import Cart from "../layout/mobileLayout/components/Cart";
import Order from './../layout/mobileLayout/components/Order';
import Profile from "../layout/mobileLayout/components/Profile";
import MenuListItemModal from "../layout/mobileLayout/components/MenuList/MenuListItemModal";
import { usePopup } from 'react-hook-popup';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import OrderHistoryModal from './../layout/mobileLayout/components/Profile/OrderHistoryModal';

const AppRouter = () => {

   const [showErrorPopup, hideErrorPopup] = usePopup('errorAlert', ({ message, handleClose }) => (
      <Snackbar
         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
         open={true}
         onClose={handleClose}
         key='errorAlert'
         autoHideDuration={6000}
      >
         <Alert severity="error" sx={{ width: '100%' }}>
            {message}
         </Alert>
      </Snackbar>
   ));

   const [showSuccessPopup, hideSuccessPopup] = usePopup('successAlert', ({ message, handleClose }) => (
      <Snackbar
         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
         open={true}
         onClose={handleClose}
         key='successAlert'
         autoHideDuration={6000}
      >
         <Alert severity="success" sx={{ width: '100%' }}>
            {message}
         </Alert>
      </Snackbar>
   ));

   return (
      <Router history={history}>
         <Routes>
            <Route path="/mobile/" element={<MobileLayout />}>
               <Route path='menu' element={<ConnectedMenuList
                  showErrorPopup={showErrorPopup}
                  showSuccessPopup={showSuccessPopup} />} />
               <Route path='cart' element={<Cart
                  showErrorPopup={showErrorPopup}
                  showSuccessPopup={showSuccessPopup} />} />
               <Route path='order' element={<Order
                  showErrorPopup={showErrorPopup}
                  showSuccessPopup={showSuccessPopup} />} />
               <Route path='profile' element={<Profile
                  showErrorPopup={showErrorPopup}
                  showSuccessPopup={showSuccessPopup} />} />
               <Route path='product/:productId' element={<MenuListItemModal
                  showErrorPopup={showErrorPopup}
                  showSuccessPopup={showSuccessPopup} />} />
               <Route path='profile/history' element={<OrderHistoryModal
                  showErrorPopup={showErrorPopup}
                  showSuccessPopup={showSuccessPopup} />} />
            </Route>

            <Route path='/' element={<Navigate to='/mobile/menu' />} />
            <Route path='*' element={<Navigate to='/mobile/menu' />} />
            <Route path='/login' element={<StartPage
               showErrorPopup={showErrorPopup}
               showSuccessPopup={showSuccessPopup} />} />
            <Route path="/login/verify" element={<VerifyModal
               showErrorPopup={showErrorPopup}
               showSuccessPopup={showSuccessPopup} />} />
         </Routes>
      </Router>
   )
};

export default AppRouter;