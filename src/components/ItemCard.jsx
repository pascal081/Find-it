import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Chip, Typography } from '@mui/material';
import PlaceOutlined from '@mui/icons-material/PlaceOutlined';
import CalendarTodayOutlined from '@mui/icons-material/CalendarTodayOutlined';

export default function ItemCard({ item }) {
  return (
    <Card component={Link} to={`/items/${item.id}`} className="item-card">
      <div className="item-image-wrap">
        <img
          src={item.image || '/images/hero-image.jpg'}
          alt={item.title}
          className="item-image"
          loading="lazy"
        />
        <Chip
          size="small"
          label={item.type === 'lost' ? 'Lost' : 'Found'}
          className={`status-chip ${item.type}`}
        />
      </div>
      <CardContent className="item-content">
        <Typography className="item-category">{item.category}</Typography>
        <Typography className="item-title" component="h3">
          {item.title}
        </Typography>
        <div className="item-meta">
          <PlaceOutlined />
          <span>{item.location}</span>
        </div>
        <div className="item-meta">
          <CalendarTodayOutlined />
          <span>
            {new Date(`${item.date}T12:00:00`).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
