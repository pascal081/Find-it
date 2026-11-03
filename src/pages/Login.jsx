import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import VisibilityRounded from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRounded from '@mui/icons-material/VisibilityOffRounded';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  if (user) return <Navigate to="/" replace />;

  const change = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setError('');
    if (!values.email || !values.password)
      return setError('Enter your email address and password.');
    try {
      await login(values);
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to log in. Please try again.');
    }
  };

  return (
    <main className="auth-page">
      <Container maxWidth="sm">
        <div className="auth-card">
          <div className="auth-brand">
            <span className="brand-mark">f</span> FindIt
          </div>
          <Typography variant="h2">Welcome back</Typography>
          <Typography color="text.secondary">
            Log in to reconnect belongings with their owners.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={submit} className="form-stack">
            <TextField
              label="Email address"
              name="email"
              type="email"
              value={values.email}
              onChange={change}
              required
              autoComplete="email"
            />
            <TextField
              label="Password"
              name="password"
              type={show ? 'text' : 'password'}
              value={values.password}
              onChange={change}
              required
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShow(!show)}
                      aria-label="Toggle password visibility"
                    >
                      {show ? (
                        <VisibilityOffRounded />
                      ) : (
                        <VisibilityRounded />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className="form-between">
              <span></span>
              <button
                type="button"
                className="text-button"
                onClick={() =>
                  setError(
                    'Password reset will be available when the API is connected.',
                  )
                }
              >
                Forgot password?
              </button>
            </div>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? 'Logging in…' : 'Log in'}
            </Button>
          </form>
          <Typography className="auth-switch">
            New to FindIt? <Link to="/signup">Create an account</Link>
          </Typography>
          <div className="demo-hint">
            <b>Demo access</b>
            <span>demo@findit.app · password123</span>
          </div>
        </div>
      </Container>
    </main>
  );
}
