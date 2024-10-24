// api/test-api.ts

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
