import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import ShieldOutlined from '@mui/icons-material/ShieldOutlined';
import VolunteerActivismOutlined from '@mui/icons-material/VolunteerActivismOutlined';
import CategoryCard from '../components/CategoryCard';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import { categories } from '../data/categories';
import { api } from '../services/api';

export default function Home() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api
      .getItems()
      .then(data => setItems(data.slice(0, 6)))
      .catch(() => setItems([]));
  }, []);

  return (
    <main>
      <section className="hero-section">
        <Container maxWidth="lg">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" /> COMMUNITY-POWERED LOST & FOUND
              </div>
              <Typography variant="h1">
                Lost something?
                <br />
                <span>Let’s find it.</span>
              </Typography>
              <Typography className="hero-subtitle">
                A missing item can make your day stressful. FindIt brings people
                together to report, discover and return lost belongings.
              </Typography>
              <SearchBar />
              <div className="hero-buttons">
                <Button
                  component={Link}
                  to="/report/lost"
                  variant="contained"
                  size="large"
                >
                  Report a lost item
                </Button>
                <Button
                  component={Link}
                  to="/report/found"
                  variant="outlined"
                  size="large"
                >
                  I found something
                </Button>
              </div>
              <div className="hero-trust">
                <ShieldOutlined />
                <span>Built for safer, more connected communities</span>
              </div>
            </div>
            <div className="hero-visual">
              <img
                src="/images/bag.jpg"
                alt="A collection of everyday belongings ready to be reunited with their owners"
              />
              <div className="hero-note">
                <span className="note-icon">
                  <VolunteerActivismOutlined />
                </span>
                <span>
                  <b>Small act. Big relief.</b>
                  <small>Help a neighbour find what matters.</small>
                </span>
              </div>
              <div className="hero-float">
                Good things find their way back <span>↗</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="section categories-section">
        <Container maxWidth="lg">
          <div className="section-heading">
            <div>
              <div className="eyebrow">FIND IT FASTER</div>
              <Typography variant="h2">Browse by category</Typography>
              <Typography color="text.secondary">
                Start with the kind of item you’re looking for.
              </Typography>
            </div>
            <Button
              component={Link}
              to="/items"
              endIcon={<ArrowForwardRounded />}
            >
              View all items
            </Button>
          </div>
          <div className="category-grid">
            {categories.map(category => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </Container>
      </section>
      <section className="section recent-section">
        <Container maxWidth="lg">
          <div className="section-heading">
            <div>
              <div className="eyebrow">FRESH FROM THE COMMUNITY</div>
              <Typography variant="h2">Recently reported</Typography>
              <Typography color="text.secondary">
                New reports from people in your community.
              </Typography>
            </div>
            <Button
              component={Link}
              to="/items"
              endIcon={<ArrowForwardRounded />}
            >
              Explore listings
            </Button>
          </div>
          <div className="items-grid">
            {items.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </section>
      <section className="cta-section">
        <Container maxWidth="lg">
          <div className="cta-panel">
            <div>
              <div className="eyebrow eyebrow-light">FOUND SOMETHING?</div>
              <Typography variant="h2">
                Be someone’s good news today.
              </Typography>
              <Typography>
                That item you picked up could mean a lot to someone. Share a
                quick report and help it find its way home.
              </Typography>
              <Button
                component={Link}
                to="/report/found"
                variant="contained"
                color="inherit"
                endIcon={<ArrowForwardRounded />}
              >
                Report a found item
              </Button>
            </div>
            <div className="cta-art">
              <VolunteerActivismOutlined />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
