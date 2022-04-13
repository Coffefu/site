import { ConnectedMenuList } from "./components/MenuList/MenuList";
import BottomNavigation from "./components/MobileBottomNavigation";
import { connect } from "react-redux";
import CartComponent from "./components/Cart";
import Order from "./components/Profile";
import StartPage from "./components/StartPage";
import { useCookies } from "react-cookie";
import navigationStore from "../../store/modules/navigationStore";

export const MobileLayout = ({ children, tab, changeActiveTab }) => {

    const [cookies, setCookie] = useCookies(["jwt"]);
    if (!cookies.jwt) {
        changeActiveTab('start');
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
                        tab === 'menu'
                            ? (<ConnectedMenuList />)
                            : tab === 'cart'
                                ? (<CartComponent />)
                                : (<Order />)
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