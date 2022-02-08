import React from "react";
import {connect} from "react-redux";
import navigationStore from "../../../store/modules/navigationStore";

const NavigationBar = ({ tab, changeActiveTab }) => {

    console.log(tab);

    return (
        <div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    tab: state.tab,
});

const mapDispatchToProps = {
    changeActiveTab: navigationStore.changeActiveTab
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar);