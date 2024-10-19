// scripts/fetchData.ts
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const RESAS_API_KEY = process.env.RESAS_API_KEY;

if (!RESAS_API_KEY) {
  console.error('Error: RESAS_API_KEY is not set.');
  process.exit(1);
}

const fetchPrefectures = async () => {
  try {
    const response = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: {
        'X-API-KEY': RESAS_API_KEY,
      },
    });
    const data = response.data.result;
    const filePath = path.join(__dirname, '..', 'src', 'data', 'prefectures.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('Prefectures data fetched and saved.');
  } catch (error) {
    console.error('Failed to fetch prefectures:', error);
    process.exit(1);
  }
};

fetchPrefectures();
