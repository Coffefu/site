import React, {useState} from 'react'
import {Box, CardContent, Modal, Typography, IconButton, Card, InputBase} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import PlaceIcon from '@mui/icons-material/Place';
import SearchIcon from '@mui/icons-material/Search';

import s from './MenuList.module.scss';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    border: '1px solid black'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    width: '100%'
}));

const TopHeader = ({coffeeHouse, coffeeHouses, changeActiveCoffeeHouse, handleClose, handleOpen, open, search, setSearch}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 320,
        maxHeight: 400,
        overflow: 'auto',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '5px',
    };

    return (
        <div className={s.headerWrapper}>
            <div className={'mb-3 mt-3 d-flex'}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon/>
                </IconButton>

                <div className={s.headerPlace + ' mb-3 mt-3 ml-auto'}>
                    <div className='d-flex align-item-center justify-content-start'>
                        <span className={s.title + ' mr-1'}>
                            <PlaceIcon sx={{marginBottom: "6px"}}/>
                        </span>
                        <span className={s.subtitle} onClick={handleOpen}> {coffeeHouse.short} </span>
                    </div>
                </div>
            </div>

            <div className={'mb-3 mt-3'} >
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={search}
                        onChange={(evt) => setSearch(evt.target.value)}
                        placeholder="Латте…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography className={'mb-2'} id="modal-modal-title" variant="h6" component="h2">
                        Выберите место, откуда будете забирать заказ
                    </Typography>
                    <div id="modal-modal-description">
                        {
                            coffeeHouses.map((coffeeHouse, index) => {
                                return (
                                    <Card key={index} id={coffeeHouse.id} className={'mb-4 border'}
                                          onClick={() => changeActiveCoffeeHouse(coffeeHouse)}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {coffeeHouse.title}
                                            </Typography>
                                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                {coffeeHouse.address}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </div>

                </Box>
            </Modal>
        </div>
    )
}

export default TopHeader;