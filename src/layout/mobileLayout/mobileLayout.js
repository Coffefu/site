import { ConnectedMenuList } from "./components/MenuList/MenuList";
import BottomNavigation from "./components/MobileBottomNavigation";
import {connect} from "react-redux";
import navigationStore from "../../store/modules/navigationStore";

export const MobileLayout = ({ children, tab, changeActiveTab }) => {
    
    return (
        <div className="container">
            {
                tab === 'menu'
                ? ( <ConnectedMenuList /> )
                : tab === 'cart'
                ? (<div>cart component</div>)
                : (<div>feedback component</div>)
            }
            {children}
            <BottomNavigation />
        </div>
    )
}

const mapStateToProps = state => ({
    tab: state.navigation.tab,
});

const mapDispatchToProps = {
    changeActiveTab: navigationStore.changeActiveTab,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MobileLayout);