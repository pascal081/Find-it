import React from 'react';
import SearchOffRounded from '@mui/icons-material/SearchOffRounded';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function EmptyState({ title = 'No items found', description = 'Try changing your search or filters.', action = true }) {
  return (
    <Box className="empty-state">
      <div className="empty-icon">
        <SearchOffRounded />
      </div>
      <Typography variant="h6">{title}</Typography>
      <Typography color="text.secondary">{description}</Typography>
      {action && (
        <Button component={Link} to="/items" variant="outlined">
          Browse all items
        </Button>
      )}
    </Box>
  );
}
