// src/api/resas.ts
import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
const RESAS_API_BASE_URL = isProduction ? '/api/resas' : '/api/v1';
const RESAS_API_KEY = 'JtdQUD3xcxseR2F486RQwNH2QY0Titu6J87gT30G';

const apiClient = axios.create({
  baseURL: RESAS_API_BASE_URL,
  headers: isProduction
    ? {}
    : { 'X-API-KEY': RESAS_API_KEY },
});

export const fetchPrefectures = async () => {
  try {
    const response = await apiClient.get('/prefectures');
    console.log('Response data from API:', response.data);

  
    if (response.status === 200 && response.data && response.data.result) {
      return response.data.result;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error: any) {
    console.error('Failed to fetch prefectures:', error);

    // エラーレスポンスのステータスコードを確認
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      throw new Error(`Error ${status}: ${message}`);
    } else {
      throw error;
    }
  }
};

// PopulationComposition インターフェースをエクスポート
export interface PopulationComposition {
  year: number;
  total: number;
  young: number;
  working: number;
  elderly: number;
}

export const fetchPopulationComposition = async (prefCode: number): Promise<PopulationComposition[] | null> => {
  try {
    const response = await apiClient.get('/population/composition/perYear', {
      params: {
        prefCode,
        cityCode: '-',
      },
    });
    const result = response.data.result;

    // データの整形
    const data = result.data;
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid response format');
    }

    // 年度の配列を取得
    const years = data[0].data.map((item: { year: number }) => item.year);

    // 各人口データをマッピング
    const populationData: PopulationComposition[] = years.map((year: number, index: number) => {
      return {
        year,
        total: data[0].data[index].value,
        young: data[1].data[index].value,
        working: data[2].data[index].value,
        elderly: data[3].data[index].value,
      };
    });

    return populationData;
  } catch (error) {
    console.error(`Failed to fetch population composition for prefCode ${prefCode}:`, error);
    return null;
  }
};