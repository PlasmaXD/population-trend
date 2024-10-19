import axios from 'axios';

const RESAS_API_BASE_URL = '/api/v1'; // プロキシ設定を利用

const apiClient = axios.create({
  baseURL: RESAS_API_BASE_URL,
  headers: {
    'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY!,
  },
});

export const fetchPrefectures = async () => {
  try {
    const response = await apiClient.get('/prefectures');
    return response.data.result;
  } catch (error) {
    console.error('Failed to fetch prefectures:', error);
    return [];
  }
};

export const fetchPopulationComposition = async (prefCode: number) => {
  try {
    const response = await apiClient.get(`/population/composition/perYear?prefCode=${prefCode}&cityCode=-`);
    return response.data.result;
  } catch (error) {
    console.error(`Failed to fetch population composition for prefCode ${prefCode}:`, error);
    return null;
  }
};
