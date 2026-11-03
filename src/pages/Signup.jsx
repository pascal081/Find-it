import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Alert, Button, Container, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { user, signup, loading } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');

  if (user) return <Navigate to="/" replace />;

  const change = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setError('');
    if (!values.name.trim()) return setError('Enter your full name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      return setError('Enter a valid email address.');
    if (values.password.length < 8)
      return setError('Password must be at least 8 characters.');
    if (values.password !== values.confirm)
      return setError('Your passwords do not match.');
    try {
      await signup({
        name: values.name.trim(),
        email: values.email,
        password: values.password,
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Unable to create account.');
    }
  };

  return (
    <main className="auth-page">
      <Container maxWidth="sm">
        <div className="auth-card">
          <div className="auth-brand">
            <span className="brand-mark">f</span> FindIt
          </div>
          <Typography variant="h2">Create your account</Typography>
          <Typography color="text.secondary">
            Join your community and help lost belongings find their way home.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={submit} className="form-stack">
            <TextField
              label="Full name"
              name="name"
              value={values.name}
              onChange={change}
              required
              autoComplete="name"
            />
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
              type="password"
              value={values.password}
              onChange={change}
              required
              helperText="Use at least 8 characters."
              autoComplete="new-password"
            />
            <TextField
              label="Confirm password"
              name="confirm"
              type="password"
              value={values.confirm}
              onChange={change}
              required
              autoComplete="new-password"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </Button>
          </form>
          <Typography className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </Typography>
        </div>
      </Container>
    </main>
  );
}
