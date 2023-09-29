import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Info from '@mui/icons-material/Info';



const NavigationMenu = () => {

    const navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAbout = () => {
        navigate('/about')
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowWidth < 820 ? (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Menu">
                    <IconButton
                        onClick={handleClick}
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MenuIcon sx={{ width: 32, height: 32, color: 'white' }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleAbout}>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    Suche
                </MenuItem>
                <MenuItem onClick={handleAbout}>
                    <ListItemIcon>
                        <FormatListBulletedIcon />
                    </ListItemIcon>
                    Auswahl
                </MenuItem>
                <MenuItem onClick={handleAbout}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    Hinzufügen
                </MenuItem>
                <MenuItem onClick={handleAbout}>
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    About
                </MenuItem>
            </Menu>
        </>
    ) : (
        <IconButton title="About" onClick={handleAbout}>
            <Info sx={{ width: 32, height: 32, color: 'white' }} />
        </IconButton>
    )
}

export default NavigationMenu