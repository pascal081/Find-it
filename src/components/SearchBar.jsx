import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';

export default function SearchBar({ initialValue = '', compact = false }) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();
  const submit = e => {
    e.preventDefault();
    navigate(
      `/items${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ''}`,
    );
  };

  return (
    <Box
      component="form"
      onSubmit={submit}
      className={`search-bar ${compact ? 'search-compact' : ''}`}
    >
      <TextField
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for an item, e.g. laptop, keys..."
        aria-label="Search items"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded color="action" />
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained">
        Search
      </Button>
    </Box>
  );
}
