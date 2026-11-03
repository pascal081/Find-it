import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, Chip, Container, Divider, Typography } from '@mui/material';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';
import PersonOutlineRounded from '@mui/icons-material/PersonOutlineRounded';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/EmptyState';

export default function ItemDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.getItem(id).then(setItem).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="page-main">
        <Container>Loading item details…</Container>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="page-main">
        <Container>
          <EmptyState
            title="This listing is unavailable"
            description="It may have been removed or the link may be incorrect."
          />
        </Container>
      </main>
    );
  }

  const contact = () =>
    setMessage(
      user
        ? `Demo contact: ${item.reporterName} can be reached at ${item.reporterEmail || 'contact details will be shared when the API is connected'}.`
        : 'Please log in to view the reporter’s contact information.',
    );

  return (
    <main className="page-main">
      <Container maxWidth="lg">
        <Button
          component={Link}
          to="/items"
          startIcon={<ArrowBackRounded />}
          className="back-link"
        >
          Back to listings
        </Button>
        <div className="detail-layout">
          <div className="detail-image">
            <img
              src={item.image || '/images/hero-image.jpg'}
              alt={item.title}
            />
          </div>
          <div className="detail-copy">
            <Chip
              label={item.type === 'lost' ? 'Lost item' : 'Found item'}
              className={`status-chip detail-status ${item.type}`}
            />
            <Typography variant="h2">{item.title}</Typography>
            <Typography className="detail-category">
              {item.category}
            </Typography>
            <div className="detail-facts">
              <div>
                <PlaceOutlined />
                <span>{item.location}</span>
              </div>
              <div>
                <CalendarTodayOutlined />
                <span>
                  {new Date(`${item.date}T12:00:00`).toLocaleDateString(
                    undefined,
                    { dateStyle: 'long' },
                  )}
                </span>
              </div>
              <div>
                <PersonOutlineRounded />
                <span>Reported by {item.reporterName}</span>
              </div>
            </div>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6">About this item</Typography>
            <Typography className="detail-description">
              {item.description}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={contact}
              fullWidth
            >
              Contact reporter
            </Button>
            {message && (
              <Alert
                severity={user ? 'info' : 'warning'}
                sx={{ mt: 2 }}
              >
                {message}
                {!user && (
                  <>
                    {' '}
                    <Link to="/login">Log in here</Link>.
                  </>
                )}
              </Alert>
            )}
            <Typography className="privacy-note">
              For your safety, never share passwords, verification codes, or
              sensitive personal details.
            </Typography>
          </div>
        </div>
      </Container>
    </main>
  );
}
