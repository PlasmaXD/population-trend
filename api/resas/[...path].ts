// api/resas/[...path].ts

const { VercelRequest, VercelResponse } = require('@vercel/node');
const axios = require('axios');

const RESAS_API_BASE_URL = 'https://opendata.resas-portal.go.jp/api/v1';
// 環境変数に戻す場合は以下を使用
// const RESAS_API_KEY = process.env.RESAS_API_KEY;
const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';

module.exports = async (req, res) => {
  const { path = [], ...query } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;

  try {
    const response = await axios.get(`${RESAS_API_BASE_URL}/${apiPath}`, {
      headers: {
        'X-API-KEY': RESAS_API_KEY,
      },
      params: query,
    });

    // レスポンスデータをそのまま返す
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(`Error fetching ${apiPath}:`, error.message);
    res.status(error.response?.status || 500).json({
      message: error.message,
      errorData: error.response?.data,
    });
  }
};

