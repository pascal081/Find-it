import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export default function CategoryCard({ category }) {
  const { Icon, name } = category;
  return (
    <Link
      to={`/items?category=${encodeURIComponent(name)}`}
      className="category-card"
    >
      <Box className="category-icon">
        <Icon />
      </Box>
      <Typography>{name}</Typography>
    </Link>
  );
}
