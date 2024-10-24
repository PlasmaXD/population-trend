// api/resas/[...path].ts
// const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';


const axios = require('axios');

const RESAS_API_BASE_URL = 'https://opendata.resas-portal.go.jp/api/v1';
// 環境変数を使用する場合は以下を使用
// const RESAS_API_KEY = process.env.RESAS_API_KEY;
// ハードコードする場合は以下を使用（セキュリティ上のリスクがあるため、テスト後は削除）
const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';

module.exports = async (req, res) => {
  const { path = [], ...query } = req.query;
  delete query.path; // 必要に応じて 'path' を削除
  const apiPath = Array.isArray(path) ? path.join('/') : path;

  try {
    console.log('RESAS_API_KEY:', RESAS_API_KEY);
    const response = await axios.get(`${RESAS_API_BASE_URL}/${apiPath}`, {
      headers: {
        'X-API-KEY': RESAS_API_KEY,
      },
      params: query,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(`Error fetching ${apiPath}:`, error.message);
    res.status(error.response?.status || 500).json({
      message: error.message,
      errorData: error.response?.data,
    });
  }
};
