import React from "react";

export const LayoutProvider = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default LayoutProvider;