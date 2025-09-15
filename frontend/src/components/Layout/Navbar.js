import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleDashboard = () => {
    if (user?.role === 'creator') {
      navigate('/creator/dashboard');
    } else if (user?.role === 'business') {
      navigate('/business/dashboard');
    }
    handleClose();
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          onClick={() => navigate('/')}
        >
          Creator Marketplace
        </Typography>

        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button 
              sx={{ 
                color: 'text.primary',
                fontWeight: 500,
                '&:hover': { backgroundColor: 'primary.light', color: 'primary.main' }
              }} 
              onClick={() => navigate('/campaigns')}
            >
              Campaigns
            </Button>
            
            {user?.role === 'creator' && (
              <Button 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 500,
                  '&:hover': { backgroundColor: 'primary.light', color: 'primary.main' }
                }} 
                onClick={() => navigate('/creator/applications')}
              >
                My Applications
              </Button>
            )}
            
            {user?.role === 'business' && (
              <Button 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 500,
                  '&:hover': { backgroundColor: 'primary.light', color: 'primary.main' }
                }} 
                onClick={() => navigate('/business/campaigns')}
              >
                My Campaigns
              </Button>
            )}

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              sx={{ 
                ml: 1,
                '&:hover': { backgroundColor: 'primary.light' }
              }}
            >
              {user?.profileImage ? (
                <Avatar src={user.profileImage} sx={{ width: 32, height: 32 }} />
              ) : (
                <AccountCircle sx={{ color: 'text.primary' }} />
              )}
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/register')}>
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
