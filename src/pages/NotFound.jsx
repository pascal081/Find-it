import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <main className="page-main">
      <Container className="not-found">
        <Typography variant="h1">404</Typography>
        <Typography variant="h4">We couldn’t find that page.</Typography>
        <Typography color="text.secondary">
          The page may have moved, or the link may be incorrect.
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Back to home
        </Button>
      </Container>
    </main>
  );
}
