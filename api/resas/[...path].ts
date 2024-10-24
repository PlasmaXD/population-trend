// api/resas/[...path].ts

import { VercelRequest, VercelResponse } from '@vercel/node';
const axios = require('axios');

const RESAS_API_BASE_URL = 'https://opendata.resas-portal.go.jp/api/v1';
const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';

export default async (req: VercelRequest, res: VercelResponse) => {
  const { path = [] } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;

  try {
    // 環境変数の値をログに出力（デバッグ用、デプロイ後に削除してください）
    console.log('RESAS_API_KEY:', process.env.RESAS_API_KEY);

    const response = await axios.get(`${RESAS_API_BASE_URL}/${apiPath}`, {
      headers: {
        'X-API-KEY': RESAS_API_KEY,
      },
      params: req.query,
    });

    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(`Error fetching ${apiPath}:`, error.message);
    // エラー内容を詳細に返す（デバッグ用、デプロイ後に削除してください）
    res.status(error.response?.status || 500).json({
      message: error.message,
      errorData: error.response?.data,
    });
  }
};
