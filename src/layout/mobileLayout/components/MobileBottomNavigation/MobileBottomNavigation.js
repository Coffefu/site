import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MobileBottomNavigation = () => {

    const [value, setValue] = React.useState(0);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Меню" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Корзина" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Отзыв" icon={<LocationOnIcon />} />
            </BottomNavigation>
        </Paper>
    )
}

export default MobileBottomNavigation;