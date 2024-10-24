// api/resas.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const RESAS_API_BASE_URL = 'https://opendata.resas-portal.go.jp/api/v1';

export default async (req: VercelRequest, res: VercelResponse) => {
  const path = req.url?.replace('/api/resas', '') || '';
  const query = req.query;

  try {
    const response = await axios.get(`${RESAS_API_BASE_URL}${path}`, {
      headers: {
        'X-API-KEY': process.env.RESAS_API_KEY!,
      },
      params: query,
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(`Error fetching ${path}:`, error.message);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};
