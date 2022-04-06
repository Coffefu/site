import React, { useEffect } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import CoffeeIcon from '@mui/icons-material/Coffee';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { connect } from "react-redux";
import navigationStore from "../../../../store/modules/navigationStore";

const MobileBottomNavigation = ({ tab, changeActiveTab }) => {

    const [value, setValue] = React.useState('menu');

    useEffect(() => {
        setValue(tab);

    }, [tab])

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                boxShadow: 'none',
                background: '#F6FCFE'
            }}
            elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    changeActiveTab(newValue)
                    setValue(newValue);
                }}
                sx={{
                    // borderTopLeftRadius: 24,
                    // borderTopRightRadius: 24,
                    borderRadius: '20px',
                    backgroundColor: "#FFFFFF",
                    margin: 2,
                    boxShadow: '0px 4px 50px rgba(50, 74, 89, 0.12)',
                }}
            >
                <BottomNavigationAction value='menu' label="Меню" icon={<CoffeeIcon />} />
                <BottomNavigationAction value='cart' label="Корзина" icon={<ShoppingBasketIcon />} />
                <BottomNavigationAction value='order' label="Заказ" icon={<AlarmOnIcon />} />
            </BottomNavigation>
        </Paper>
    )
}

const mapStateToProps = state => ({
    tab: state.navigation.tab
});

const mapDispatchToProps = {
    changeActiveTab: navigationStore.changeActiveTab,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MobileBottomNavigation);
