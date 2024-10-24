// api/resas/[...path].ts
// const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';
// api/resas/[...path].ts

import axios from 'axios';

const RESAS_API_BASE_URL = 'https://opendata.resas-portal.go.jp/api/v1';
// ハードコードした API キーを使用
const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';
if (!RESAS_API_KEY) {
  throw new Error('RESAS_API_KEY is not defined');
}
export default async (req, res) => {
  const { path = [], ...query } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;

  // リクエストヘッダーを定義
  const headers = {
    'X-API-KEY': RESAS_API_KEY,
  };

  // デバッグ用にリクエストヘッダーをログに出力
  console.log('Request headers:', headers);

  try {
    const response = await axios.get(`${RESAS_API_BASE_URL}/${apiPath}`, {
      headers,
      params: query,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(`Error fetching ${apiPath}:`, error.message);
    console.error('Error response data:', error.response?.data);
    res.status(error.response?.status || 500).json({
      message: error.message,
      errorData: error.response?.data,
    });
  }
};

