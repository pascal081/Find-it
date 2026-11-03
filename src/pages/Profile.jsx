import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Container, Typography } from '@mui/material';
import PersonOutlineRounded from '@mui/icons-material/PersonOutlineRounded';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="page-main">
      <Container maxWidth="sm">
        <div className="profile-card">
          <Avatar className="profile-avatar">
            {user.name?.[0]?.toUpperCase()}
          </Avatar>
          <Typography variant="h2">{user.name}</Typography>
          <Typography color="text.secondary">
            FindIt community member
          </Typography>
          <div className="profile-detail">
            <PersonOutlineRounded />
            <span>
              <small>Full name</small>
              {user.name}
            </span>
          </div>
          <div className="profile-detail">
            <EmailOutlined />
            <span>
              <small>Email address</small>
              {user.email}
            </span>
          </div>
          <Button
            component={Link}
            to="/my-reports"
            variant="outlined"
            fullWidth
          >
            View my reports
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => {
              logout();
              navigate('/');
            }}
            fullWidth
          >
            Log out
          </Button>
        </div>
      </Container>
    </main>
  );
}
