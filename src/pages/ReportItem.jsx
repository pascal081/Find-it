import React, { useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Container, MenuItem, TextField, Typography } from '@mui/material';
import CloudUploadOutlined from '@mui/icons-material/CloudUploadOutlined';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { categories } from '../data/categories';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ReportItem() {
  const { type } = useParams();
  const isFound = type === 'found';
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [values, setValues] = useState({
    title: '',
    category: '',
    location: '',
    date: new Date().toISOString().slice(0, 10),
    description: '',
  });
  const [image, setImage] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user)
    return (
      <Navigate to="/login" replace state={{ from: `/report/${type}` }} />
    );
  if (!['lost', 'found'].includes(type))
    return <Navigate to="/not-found" replace />;

  const change = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const pickImage = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/'))
      return setError('Please select an image file.');
    if (file.size > 5 * 1024 * 1024)
      return setError('Image must be smaller than 5 MB.');
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setFileName(file.name);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const submit = async e => {
    e.preventDefault();
    setError('');
    if (
      !values.title.trim() ||
      !values.category ||
      !values.location.trim() ||
      !values.date ||
      !values.description.trim()
    )
      return setError('Please complete all required fields.');
    setLoading(true);
    try {
      const payload = {
        ...values,
        title: values.title.trim(),
        location: values.location.trim(),
        description: values.description.trim(),
        image: image || '/images/hero-image.jpg',
        reporterName: user.name,
        reporterEmail: user.email,
        userId: user.id,
      };
      const saved =
        type === 'lost'
          ? await api.submitLostReport(payload)
          : await api.submitFoundReport(payload);
      setSuccess(true);
      setTimeout(() => navigate(`/items/${saved.id}`), 900);
    } catch (err) {
      setError(err.message || 'Your report could not be saved.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-main">
      <Container maxWidth="md">
        <div className="form-page-heading">
          <div className="eyebrow">HELP THE COMMUNITY</div>
          <Typography variant="h2">Report a {type} item</Typography>
          <Typography color="text.secondary">
            {isFound
              ? 'Tell the community what you found. A few details can help reunite it with its owner.'
              : 'Share the details of the item you lost so someone can help you find it.'}
          </Typography>
        </div>
        <form className="report-form" onSubmit={submit}>
          {success && (
            <Alert severity="success">
              Your report has been saved. Opening your listing…
            </Alert>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <div className="form-grid">
            <TextField
              label="Item name"
              name="title"
              value={values.title}
              onChange={change}
              placeholder="e.g. Silver laptop"
              required
            />
            <TextField
              select
              label="Category"
              name="category"
              value={values.category}
              onChange={change}
              required
            >
              <MenuItem value="" disabled>
                Select a category
              </MenuItem>
              {categories.map(c => (
                <MenuItem key={c.name} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Location"
              name="location"
              value={values.location}
              onChange={change}
              placeholder="Where was it lost or found?"
              required
            />
            <TextField
              label={isFound ? 'Date found' : 'Date lost'}
              name="date"
              type="date"
              value={values.date}
              onChange={change}
              required
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <TextField
            label="Description"
            name="description"
            value={values.description}
            onChange={change}
            multiline
            minRows={4}
            placeholder="Add identifying details, colour, brand, condition or where it was last seen…"
            required
          />
          <div
            className="upload-area"
            onClick={() => fileRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              hidden
              type="file"
              accept="image/*"
              onChange={pickImage}
            />
            {image ? (
              <>
                <img
                  src={image}
                  alt="Selected item preview"
                  className="upload-preview"
                />
                <span>{fileName}</span>
                <button
                  type="button"
                  className="remove-image"
                  onClick={e => {
                    e.stopPropagation();
                    setImage('');
                    setFileName('');
                  }}
                >
                  <CloseRounded />
                </button>
              </>
            ) : (
              <>
                <CloudUploadOutlined />
                <b>Add an item photo</b>
                <span>
                  Choose a clear photo from your device · JPG, PNG up to 5 MB
                </span>
              </>
            )}
          </div>
          <div className="form-actions">
            <Button
              component={Link}
              to="/"
              variant="outlined"
              color="inherit"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Submitting…' : 'Submit report'}
            </Button>
          </div>
          <Typography className="privacy-note">
            Only share information that helps identify the item. Avoid
            including passwords, full card numbers or other sensitive details.
          </Typography>
        </form>
      </Container>
    </main>
  );
}
