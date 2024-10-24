// api/resas/[...path].ts
// const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';


// api/resas/[...path].ts

// api/resas/[...path].ts

const axios = require('axios');

const RESAS_API_BASE_URL = 'https://opendata.resas-portal.go.jp/api/v1';
const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';

module.exports = async (req, res) => {
  const { path = [], ...query } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;

  try {
    // 動的インポートで public-ip を読み込む
    const publicIp = await import('public-ip');
    const ipAddress = await publicIp.publicIpv4();
    console.log('Serverless function IP address:', ipAddress);

    const headers = {
      'X-API-KEY': RESAS_API_KEY,
      'User-Agent': 'VercelServerlessFunction',
      'Accept': 'application/json',
    };

    console.log('Requesting RESAS API with headers:', headers);
    console.log('Requesting RESAS API with query params:', query);

    const response = await axios.get(`${RESAS_API_BASE_URL}/${apiPath}`, {
      headers,
      params: query,
    });

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
