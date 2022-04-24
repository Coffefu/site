import React, { useEffect, useState } from "react";
import OrderHistoryItem from "./OrderHistoryItem";
import menuStore from "../../../../store/modules/menuStore";
import { connect } from "react-redux";
import s from "./Profile.module.scss";
import { CircularProgress } from "@mui/material";

const OrderHistory = ({ menu, addons, coffeeHouses, orders, receiveAddons, receiveCoffeeHouses, receiveMenu }) => {

   const [loading, setLoading] = useState(true);
   const [fullOrders, setFullOrders] = useState(null);
   useEffect(() => {
      const getMenu = async () => {
         setLoading(true);
         await receiveMenu();
         await receiveAddons();
         await receiveCoffeeHouses();
         setLoading(false);
      }

      getMenu();
   }, [])

   useEffect(() => {
      if (menu.length !== 0 && addons.length !== 0 && coffeeHouses.length !== 0) {
         const fullOrders = orders.map((order) => {
            return {
               ...order,
               products: order.products.map((product) => {
                  const fullProduct = menu.filter(item => item.variations.some(variant => variant.id === product.id))[0];
                  const variant = fullProduct.variations.filter(variant => variant.id === product.id)[0];
                  return {
                     name: fullProduct.name,
                     id: variant.id,
                     size: variant.size,
                     price: variant.price,
                     toppings: product.toppings.map(topping => {
                        const fullTopping = addons.filter(addon => addon.id === topping)[0];
                        return {
                           ...fullTopping,
                        }
                     }),
                  }
               }),
               coffee_house: coffeeHouses.filter(ch => ch.id === order.coffee_house)[0],
            }
         })
         setFullOrders(fullOrders);
      } else {
         setFullOrders([]);
      }
   }, [menu, addons, coffeeHouses])

   if (loading || !fullOrders) {
      return (
         <div className='d-flex align-items-center justify-content-center'>
            <CircularProgress color="success" />
         </div>
      )
   }

   return (
      <div className={'mb65-container mt-3 ' + s.orderHistory}>
         {
            fullOrders.map((item, index) => {
               return (
                  <OrderHistoryItem key={index} item={item} />
               )
            })
         }
      </div>
   )
};

const mapStateToProps = state => ({
   menu: state.menu.menu,
   addons: state.menu.addons,
   coffeeHouses: state.menu.coffeeHouses,
});

const mapDispatchToProps = {
   receiveMenu: menuStore.receiveMenu,
   receiveAddons: menuStore.receiveAddons,
   receiveCoffeeHouses: menuStore.receiveCoffeeHouses
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(OrderHistory);