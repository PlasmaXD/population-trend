// api/resas/[...path].ts
// const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';
// api/resas/[...path].ts

// const axios = require('axios');

// const RESAS_API_BASE_URL = 'https://opendata.resas-portal.go.jp/api/v1';
// // ハードコードした API キーを使用
// const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';
// module.exports = async (req, res) => {
//   const { path = [], ...query } = req.query;
//   const apiPath = Array.isArray(path) ? path.join('/') : path;

//   // リクエストヘッダーを定義
//   const headers = {
//     'X-API-KEY': RESAS_API_KEY,
//   };

//   // デバッグ用にリクエストヘッダーをログに出力
//   console.log('Request headers:', headers);

//   try {
//     const response = await axios.get(`${RESAS_API_BASE_URL}/${apiPath}`, {
//       headers,
//       params: query,
//     });

//     res.status(response.status).json(response.data);
//   } catch (error) {
//     console.error(`Error fetching ${apiPath}:`, error.message);
//     console.error('Error response data:', error.response?.data);
//     res.status(error.response?.status || 500).json({
//       message: error.message,
//       errorData: error.response?.data,
//     });
//   }
// };

const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching GitHub API:', error.message);
    res.status(error.response?.status || 500).json({
      message: error.message,
      errorData: error.response?.data,
    });
  }
};
