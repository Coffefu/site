import { ConnectedMenuList } from "./components/MenuList/MenuList";
import BottomNavigation from "./components/MobileBottomNavigation";
import {connect} from "react-redux";
import CartComponent from "./components/Cart";
import Order from "./components/Order";
import StartPage from "./components/StartPage";

export const MobileLayout = ({ children, tab }) => {
    
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
                            ? ( <ConnectedMenuList /> )
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

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MobileLayout);