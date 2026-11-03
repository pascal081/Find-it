import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import FilterAltOffRounded from '@mui/icons-material/FilterAltOffRounded';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import EmptyState from '../components/EmptyState';
import { categories } from '../data/categories';
import { api } from '../services/api';

export default function BrowseItems() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const type = params.get('type') || 'all';
  const category = params.get('category') || 'all';
  const search = params.get('search') || '';

  useEffect(() => {
    let active = true;
    api
      .getItems()
      .then(data => {
        if (active) setItems(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(
    () =>
      items.filter(item => {
        const haystack = [
          item.title,
          item.category,
          item.description,
          item.location,
        ]
          .join(' ')
          .toLowerCase();
        return (
          (type === 'all' || item.type === type) &&
          (category === 'all' || item.category === category) &&
          (!search || haystack.includes(search.toLowerCase()))
        );
      }),
    [items, type, category, search],
  );

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  const clear = () => setParams({});

  return (
    <main className="page-main">
      <Container maxWidth="lg">
        <div className="page-heading">
          <div className="eyebrow">THE COMMUNITY BOARD</div>
          <Typography variant="h2">Browse lost & found items</Typography>
          <Typography color="text.secondary">
            Search community reports and help belongings find their way home.
          </Typography>
        </div>
        <div className="browse-tools">
          <SearchBar initialValue={search} compact />
          <FormControl size="small">
            <InputLabel>Listing type</InputLabel>
            <Select
              label="Listing type"
              value={type}
              onChange={e => update('type', e.target.value)}
            >
              <MenuItem value="all">All items</MenuItem>
              <MenuItem value="lost">Lost items</MenuItem>
              <MenuItem value="found">Found items</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={category}
              onChange={e => update('category', e.target.value)}
            >
              <MenuItem value="all">All categories</MenuItem>
              {categories.map(c => (
                <MenuItem key={c.name} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={clear}
            startIcon={<FilterAltOffRounded />}
            className="clear-filters"
          >
            Clear filters
          </Button>
        </div>
        <div className="results-line">
          <Typography>
            <b>{loading ? '…' : filtered.length}</b>{' '}
            {filtered.length === 1 ? 'result' : 'results'}
          </Typography>
          <div className="active-filter">
            {type !== 'all' && (
              <span>{type === 'lost' ? 'Lost' : 'Found'}</span>
            )}
            {category !== 'all' && <span>{category}</span>}
            {search && <span>“{search}”</span>}
          </div>
        </div>
        {loading ? (
          <div className="loading-grid">Loading community listings…</div>
        ) : filtered.length ? (
          <div className="items-grid">
            {filtered.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matching items yet"
            description="Try a different keyword or remove one of your filters."
            action={false}
          />
        )}
      </Container>
    </main>
  );
}
