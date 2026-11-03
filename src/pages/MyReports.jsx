import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import ItemCard from '../components/ItemCard';
import EmptyState from '../components/EmptyState';

export default function MyReports() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMyReports(user.id).then(setItems).finally(() => setLoading(false));
  }, [user.id]);

  return (
    <main className="page-main">
      <Container maxWidth="lg">
        <div className="page-heading">
          <div className="eyebrow">YOUR CONTRIBUTION</div>
          <Typography variant="h2">My reports</Typography>
          <Typography color="text.secondary">
            Keep track of the items you have reported to the community.
          </Typography>
        </div>
        {loading ? (
          <p>Loading your reports…</p>
        ) : items.length ? (
          <div className="items-grid">
            {items.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="You haven’t made a report yet"
            description="When you report a lost or found item, it will appear here."
          />
        )}
      </Container>
    </main>
  );
}
