import { ConnectedMenuList } from "./components/MenuList/MenuList";
import BottomNavigation from "./components/MobileBottomNavigation";
import { connect } from "react-redux";
import CartComponent from "./components/Cart";
import Order from "./components/Order";
import StartPage from "./components/StartPage";
import Profile from './components/Profile'
import { useCookies } from "react-cookie";
import navigationStore from "../../store/modules/navigationStore";
import {useEffect} from "react";
import moment from "moment";

export const MobileLayout = ({ children, tab, changeActiveTab }) => {

    const [cookies, setCookie] = useCookies(["jwt"]);
    if (!cookies.jwt) {
        changeActiveTab('start');
    }

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
            setCookie('jwt', response,
                {
                    path: '/',
                    expires: new Date(moment().add(15, 'd').format()),
                });
        }
        updateToken();
    }, [])

    const getComponent = (tab) => {
        switch (tab) {
            case 'menu':
                return (<ConnectedMenuList />);
            case 'cart':
                return (<CartComponent />);
            case 'profile':
                return (<Profile />);
            case 'order':
                return (<Order />)
        }
    }

    if (tab === 'start') {
        return (
            <StartPage />
        )
    } else {
        return (
            <>
                <div className="container">
                    {
                        getComponent(tab)
                    }
                    {children}
                    <BottomNavigation />
                </div>
            </>
        )
    }
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