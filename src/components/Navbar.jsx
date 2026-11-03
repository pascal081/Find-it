import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuRounded from '@mui/icons-material/MenuRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import AddRounded from '@mui/icons-material/AddRounded';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Lost items', to: '/items?type=lost' },
    { label: 'Found items', to: '/items?type=found' },
    { label: 'Browse', to: '/items' },
  ];

  const close = () => setOpen(false);

  const navLinks = (
    <>
      {links.map(link => (
        <Button
          key={link.label}
          component={NavLink}
          to={link.to}
          onClick={close}
          className="nav-link"
        >
          {link.label}
        </Button>
      ))}
    </>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        className="site-header"
      >
        <Toolbar className="nav-toolbar">
          <Link to="/" className="brand">
            <span className="brand-mark">f</span>
            <span>
              Find<span className="brand-blue">It</span>
            </span>
          </Link>
          <Box className="desktop-nav">{navLinks}</Box>
          <Box className="nav-actions">
            <IconButton
              aria-label="Search items"
              onClick={() => navigate('/items')}
              className="search-icon"
            >
              <SearchRounded />
            </IconButton>
            {user ? (
              <>
                <Button
                  component={Link}
                  to="/my-reports"
                  className="nav-link reports-link"
                >
                  My Reports
                </Button>
                <Button
                  component={Link}
                  to="/profile"
                  className="profile-link"
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: '#EAF1FF',
                      color: '#155EEF',
                      fontSize: 13,
                    }}
                  >
                    {user.name?.[0]?.toUpperCase()}
                  </Avatar>
                  <span className="profile-name">
                    {user.name?.split(' ')[0]}
                  </span>
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="logout-link"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  className="login-link"
                >
                  Log in
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="outlined"
                  className="signup-link"
                >
                  Sign up
                </Button>
              </>
            )}
            <Button
              component={Link}
              to="/report/lost"
              variant="contained"
              startIcon={<AddRounded />}
              className="report-nav"
            >
              Report item
            </Button>
          </Box>
          <IconButton
            className="mobile-menu"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <MenuRounded />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={open} onClose={close}>
        <Box sx={{ width: 285, p: 2 }}>
          <Box className="drawer-brand">
            <span className="brand-mark">f</span> FindIt
          </Box>
          <List>
            {links.map(link => (
              <ListItemButton
                key={link.label}
                component={Link}
                to={link.to}
                onClick={close}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
            {user ? (
              <>
                <ListItemButton
                  component={Link}
                  to="/my-reports"
                  onClick={close}
                >
                  <ListItemText primary="My Reports" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/profile"
                  onClick={close}
                >
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    logout();
                    close();
                    navigate('/');
                  }}
                >
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton
                  component={Link}
                  to="/login"
                  onClick={close}
                >
                  <ListItemText primary="Log in" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/signup"
                  onClick={close}
                >
                  <ListItemText primary="Sign up" />
                </ListItemButton>
              </>
            )}
          </List>
          <Button
            fullWidth
            component={Link}
            to="/report/lost"
            variant="contained"
            onClick={close}
          >
            Report an item
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
