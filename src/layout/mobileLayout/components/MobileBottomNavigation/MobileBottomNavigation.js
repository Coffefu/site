import React, { useEffect } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import CoffeeIcon from '@mui/icons-material/Coffee';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import { connect } from "react-redux";
import navigationStore from "../../../../store/modules/navigationStore";
import { AlarmOn } from "@mui/icons-material";
import { useLocation, useNavigate } from 'react-router-dom';

const MobileBottomNavigation = ({ tab, changeActiveTab }) => {

    const [value, setValue] = React.useState('menu');
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setValue(tab);
        if (location.pathname.slice(8) !== value) {
            setValue(location.pathname.slice(8));
        }
    }, [tab, location])

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
                    navigate(`/mobile/${newValue}`);
                    changeActiveTab(newValue);
                    setValue(newValue);
                }}
                sx={{
                    borderRadius: '20px',
                    backgroundColor: "#FFFFFF",
                    margin: 2,
                    boxShadow: '0px 4px 50px rgba(50, 74, 89, 0.12)',
                }}
            >
                <BottomNavigationAction value='menu' label="Меню" icon={<CoffeeIcon />} />
                <BottomNavigationAction value='cart' label="Корзина" icon={<ShoppingBasketIcon />} />
                <BottomNavigationAction value='order' label="Заказ" icon={<AlarmOn />} />
                <BottomNavigationAction value='profile' label="Профиль" icon={<PersonIcon />} />
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
