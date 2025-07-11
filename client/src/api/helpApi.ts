import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getHelpRequests = () => API.get('/help-request');
export const createHelpRequest = (data: any, token: string) =>
  API.post('/help-request', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getHelpRequestById = (id: string) =>
  API.get(`/help-request/${id}`);

export const acceptHelpRequest = (id: string, token: string) =>
  API.put(
    `/help-request/${id}/accept`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getMyHelpRequests = (token: string) =>
  API.get('/help-request/my', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAcceptedHelpRequests = (token: string) =>
  API.get('/help-request/accepted', {
    headers: { Authorization: `Bearer ${token}` },
  });
