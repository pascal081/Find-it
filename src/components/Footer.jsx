import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Divider, Typography } from '@mui/material';

export default function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Box className="footer-top">
          <Box>
            <Link to="/" className="brand footer-brand">
              <span className="brand-mark">f</span>
              <span>
                Find<span className="brand-blue">It</span>
              </span>
            </Link>
            <Typography className="footer-description">
              A little help from the community can bring a missing belonging
              back home.
            </Typography>
          </Box>
          <Box className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/items">Browse items</Link>
            <Link to="/items?type=lost">Lost items</Link>
            <Link to="/items?type=found">Found items</Link>
            <Link to="/report/lost">Report an item</Link>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,.13)', my: 3 }} />
        <Typography className="copyright">
          © {new Date().getFullYear()} FindIt. Built to bring belongings home.
        </Typography>
      </Container>
    </footer>
  );
}
