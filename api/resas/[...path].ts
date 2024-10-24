// api/resas/[...path].ts
// const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';


// api/resas/[...path].ts

const axios = require('axios');
const publicIp = require('public-ip'); // 追加

const RESAS_API_BASE_URL = 'https://opendata.resas-portal.go.jp/api/v1';
// ハードコードした API キーを使用（テスト後は必ず削除してください）
const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';


module.exports = async (req, res) => {
  const { path = [], ...query } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;

  try {
    // サーバーレス関数の IP アドレスを取得
    const ipAddress = await publicIp.v4();
    console.log('Serverless function IP address:', ipAddress);

    // リクエストヘッダーを設定
    const headers = {
      'X-API-KEY': RESAS_API_KEY,
      'User-Agent': 'VercelServerlessFunction',
      'Accept': 'application/json',
    };

    // リクエストヘッダーとパラメータをログに出力
    console.log('Requesting RESAS API with headers:', headers);
    console.log('Requesting RESAS API with query params:', query);

    const response = await axios.get(`${RESAS_API_BASE_URL}/${apiPath}`, {
      headers,
      params: query,
    });

    // レスポンスデータをログに出力（デバッグ用）
    console.log('RESAS API response:', response.data);

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
