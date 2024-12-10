import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Menus from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import menus from '../../json-api/admin-menu.json';
import { Avatar, Divider, Tooltip } from '@mui/material';
import { useLocation } from 'react-router-dom';
// import { AccountCircle } from '@mui/icons-material';

// eslint-disable-next-line react/prop-types
const AdminLayout = ({ children }) => {
    const location = useLocation();
    const [active, setActive] = useState(true);
    const [width, setWidth] = useState(250);
    const isMobile = useMediaQuery('(max-width: 600px)'); // Detect mobile screens

    const controlDrawer = () => {
        setActive(!active);
        setWidth(active ? 0 : 250);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Stack>
                {!isMobile && ( // Hide Drawer on mobile
                    <Drawer
                        sx={{
                            width: width,
                            '& .MuiDrawer-paper': {
                                width: width,
                                bgcolor: '#f5f5f5',
                            },
                        }}
                        variant="persistent"
                        open={active}
                    >
                        <Box className="text-center" sx={{ p: 2 }}>
                            <img src="/logo.png" alt="Logo" />
                        </Box>
                        <List>
                            {menus.map((item, index) => (
                                <Link to={item.path} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <ListItem disablePadding sx={{
                                        backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.07)' : 'transparent',
                                    }}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <span className="material-icons">{item.icon}</span>
                                            </ListItemIcon>
                                            <ListItemText primary={item.label} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Drawer>
                )}
                <AppBar
                    sx={{
                        width: isMobile ? '100%' : `calc(100% - ${width}px)`,
                        transition: '0.3s',
                        bgcolor: '#f5f5f5',
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Toolbar>
                            {isMobile ? ( // Show Logo on mobile
                                <Box className="text-center" sx={{ flexGrow: 1 }}>
                                    <img src="/logo.png" alt="Logo" />
                                </Box>
                            ) : (
                                <IconButton onClick={controlDrawer}>
                                    <span className="material-icons">menu</span>
                                </IconButton>
                            )}
                        </Toolbar>
                        <Toolbar>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>
                                        {/* <AccountCircle /> */}
                                        <img src="/user.png" width="30" height="30" alt="user" />
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menus
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                {menus.map((item, index) => (
                                    <Link to={item.path} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <MenuItem onClick={handleClose} sx={{
                                            backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.07)' : 'transparent',
                                        }}>
                                            <ListItemIcon>
                                                <span className="material-icons">{item.icon}</span>
                                            </ListItemIcon>
                                            <ListItemText primary={item.label} />
                                        </MenuItem>
                                    </Link>
                                ))}
                                <Divider />
                            </Menus>
                        </Toolbar>
                    </Stack>
                </AppBar>
                <Stack
                    sx={{
                        ml: isMobile ? 0 : `${width}px`,
                        mt: 8,
                        p: 3,
                        transition: '0.3s',
                    }}
                >
                    {children}
                </Stack>
            </Stack>
        </>
    );
};

export default AdminLayout;
