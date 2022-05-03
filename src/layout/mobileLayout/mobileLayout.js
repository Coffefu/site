import { ConnectedMenuList } from "./components/MenuList/MenuList";
import BottomNavigation from "./components/MobileBottomNavigation";
import { connect } from "react-redux";
import CartComponent from "./components/Cart";
import Order from "./components/Order";
import StartPage from "./components/StartPage";
import Profile from './components/Profile'
import { useCookies } from "react-cookie";
import navigationStore from "../../store/modules/navigationStore";
import { useEffect } from "react";
import moment from "moment";
import { Outlet, useNavigate } from "react-router-dom";
import { usePopup } from 'react-hook-popup';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

export const MobileLayout = ({ children, tab, changeActiveTab }) => {

    const [cookies, setCookie] = useCookies(["jwt"]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!cookies.jwt) {
            navigate('/login');
            changeActiveTab('start');
        }
    }, [])


    useEffect(() => {
        const updateToken = async () => {
            const request = await fetch(`https://cofefu.ru/api/update_token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-token': cookies.jwt
                }
            })
            const response = await request.json();
            if (response.detail !== 'Не удалось проверить учетные данные.') {
                setCookie('jwt', response,
                    {
                        path: '/',
                        expires: new Date(moment().add(15, 'd').format()),
                    });
            }
        }
        updateToken();
    }, [])

    return (
        <>
            <div className="container">

                <Outlet />
                <BottomNavigation />
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    tab: state.navigation.tab,
});

const mapDispatchToProps = {
    changeActiveTab: navigationStore.changeActiveTab
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MobileLayout);