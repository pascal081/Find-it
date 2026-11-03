import axios from 'axios';
import { demoItems } from '../data/demoItems';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const http = axios.create({ baseURL: BASE_URL, timeout: 15000 });

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const delay = (value) =>
  new Promise(resolve => setTimeout(() => resolve(value), 250));

const allItems = () => [...read('findit_reports', []), ...demoItems];

export const api = {
  async register(payload) {
    if (!USE_MOCK)
      return (await http.post('/auth/register', payload)).data; // PLACEHOLDER: map to lecturer API.
    const users = read('findit_users', []);
    if (
      users.some(
        u => u.email.toLowerCase() === payload.email.toLowerCase(),
      )
    )
      throw new Error('An account with this email already exists.');
    const user = {
      id: `user-${Date.now()}`,
      name: payload.name,
      email: payload.email,
    };
    write('findit_users', [...users, { ...user, password: payload.password }]);
    return delay(user);
  },
  async login(payload) {
    if (!USE_MOCK)
      return (await http.post('/auth/login', payload)).data; // PLACEHOLDER.
    const users = read('findit_users', []);
    const seeded = [
      {
        id: 'demo-user',
        name: 'FindIt Demo User',
        email: 'demo@findit.app',
        password: 'password123',
      },
      ...users,
    ];
    const match = seeded.find(
      u =>
        u.email.toLowerCase() === payload.email.toLowerCase() &&
        u.password === payload.password,
    );
    if (!match) throw new Error('Email or password is incorrect.');
    const { password, ...user } = match;
    return delay(user);
  },
  async getItems(params = {}) {
    if (!USE_MOCK)
      return (await http.get('/items', { params })).data; // PLACEHOLDER.
    return delay(allItems());
  },
  async getItem(id) {
    if (!USE_MOCK)
      return (await http.get(`/items/${id}`)).data; // PLACEHOLDER.
    return delay(
      allItems().find(item => String(item.id) === String(id)) || null,
    );
  },
  async submitLostReport(payload) {
    if (!USE_MOCK)
      return (await http.post('/items/lost', payload)).data; // PLACEHOLDER.
    return saveReport({ ...payload, type: 'lost' });
  },
  async submitFoundReport(payload) {
    if (!USE_MOCK)
      return (await http.post('/items/found', payload)).data; // PLACEHOLDER.
    return saveReport({ ...payload, type: 'found' });
  },
  async getMyReports(userId) {
    if (!USE_MOCK)
      return (await http.get('/users/me/reports')).data; // PLACEHOLDER.
    return delay(
      read('findit_reports', []).filter(item => item.userId === userId),
    );
  },
};

async function saveReport(payload) {
  const reports = read('findit_reports', []);
  const report = {
    ...payload,
    id: `report-${Date.now()}`,
    date: payload.date,
    reporterName: payload.reporterName,
    createdAt: new Date().toISOString(),
  };
  write('findit_reports', [report, ...reports]);
  return delay(report);
}

export { USE_MOCK };
