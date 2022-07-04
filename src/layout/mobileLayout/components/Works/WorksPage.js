import React from 'react';
import s from "./WorksPage.module.scss";
import WarningIcon from '@mui/icons-material/Warning';

const WorksPage = () => {
    return (
        <div className={s.container}>
            <div>
                <WarningIcon sx={{ fontSize: 60 }} />
                <br />
                Сервис закрыт на летний период. <br />Извините за
                доставленные неудобства
            </div>
        </div>
    )
};

export default WorksPage;
