import { ConnectedMenuList } from "./components/MenuList/MenuList";
import BottomNavigation from "./components/MobileBottomNavigation";

export const MobileLayout = (props) => {
    return (
        <div className="container">
            <ConnectedMenuList />
            {props.children}
            <BottomNavigation />
        </div>
    )
}

export default MobileLayout;