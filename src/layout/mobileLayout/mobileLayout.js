import BottomNavigation from "./components/MobileBottomNavigation";
import { connect } from "react-redux"; 
import { useCookies } from "react-cookie";
import navigationStore from "../../store/modules/navigationStore";
import { useEffect } from "react";
import moment from "moment";
import { Outlet, useNavigate } from "react-router-dom";

const { REACT_APP_ENVIRONMENT } = process.env;

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
            const request = await fetch(`https://cofefu.ru${REACT_APP_ENVIRONMENT || ''}/api/update_token`, {
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