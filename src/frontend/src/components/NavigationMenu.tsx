import * as React from 'react';
import { useNavigate } from 'react-router-dom';

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



const NavigationMenu = () => {

    const navigate = useNavigate()

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

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
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
                    Search
                </MenuItem>
                <MenuItem onClick={handleAbout}>
                    <ListItemIcon>
                        <FormatListBulletedIcon />
                    </ListItemIcon>
                    Pick
                </MenuItem>
                <MenuItem onClick={handleAbout}>
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    About
                </MenuItem>
            </Menu>
        </>
    )
}

export default NavigationMenu