import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import menuStore from '../../../../store/modules/menuStore'
import MenuListItem from './MenuListItem';

const MenuList = ({ menu = [], receiveMenu }) => {

   useEffect(() => {

      receiveMenu();
   }, [])


   return (
      <div>
         <div className='col menu-container'>
            {menu.map((product, index) => {
               return (
                  <MenuListItem key={index} item={product} />
               )
            })}
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   menu: state.menu.menu
});

const mapDispatchToProps = {
   receiveMenu: menuStore.receiveMenu,
};

export const ConnectedMenuList = connect(
   mapStateToProps,
   mapDispatchToProps
)(MenuList);
