// api/resas/[...path].ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const RESAS_API_BASE_URL = 'https://opendata.resas-portal.go.jp/api/v1';

export default async (req: VercelRequest, res: VercelResponse) => {
  // `path` は配列としてキャッチオールパスを取得
  const { path = [] } = req.query;

  // パスを結合して RESAS API のエンドポイントを形成
  const apiPath = Array.isArray(path) ? path.join('/') : path;

  try {
    const response = await axios.get(`${RESAS_API_BASE_URL}/${apiPath}`, {
      headers: {
        'X-API-KEY': process.env.RESAS_API_KEY!,
      },
      params: req.query,
    });
    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(`Error fetching ${apiPath}:`, error.message);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};