import React, { useState, useEffect } from 'react';
import PrefectureSelector from './components/PrefectureSelector';
import PopulationChart from './components/PopulationChart';
import { fetchPopulationComposition, fetchPrefectures } from './api/resas';
import prefecturesData from './data/prefectures.json';


interface PopulationComposition {
  year: number;
  total: number;
  young: number;
  working: number;
  elderly: number;
}

interface Prefecture {
  prefCode: number;
  prefName: string;
}

type PopulationType = 'total' | 'young' | 'working' | 'elderly';

const App: React.FC = () => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  const [populationData, setPopulationData] = useState<{ [key: number]: PopulationComposition[] }>({});
  const [currentType, setCurrentType] = useState<PopulationType>('total');
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);


  // useEffect(() => {
  //   const getPrefectures = async () => {
  //     const data = await fetchPrefectures();
  //     console.log('Fetched prefectures:', data);
  //     setPrefectures(data);
  //   };
  //   getPrefectures();
  // }, []);

  const handlePrefChange = (prefCode: number) => {
    setSelectedPrefectures((prev) =>
      prev.includes(prefCode) ? prev.filter((code) => code !== prefCode) : [...prev, prefCode]
    );
  };

  useEffect(() => {
    const getPopulationData = async () => {
      const data: { [key: number]: PopulationComposition[] } = {};
      await Promise.all(
        selectedPrefectures.map(async (prefCode) => {
          const res = await fetchPopulationComposition(prefCode);
          const composition = res.data[0].data;
          const formattedData = composition.map((item: any) => ({
            year: item.year,
            total: item.value,
            young: item['year'] < 1980 ? null : item.value, // 年少人口などのデータを適切に設定
            working: item['year'] < 1980 ? null : item.value,
            elderly: item['year'] < 1980 ? null : item.value,
          }));
          data[prefCode] = formattedData;
        })
      );
      setPopulationData(data);
    };

    if (selectedPrefectures.length > 0) {
      getPopulationData();
    } else {
      setPopulationData({});
    }
  }, [selectedPrefectures]);


  const prefNames = (prefectures ?? []).reduce((acc, pref) => {
    acc[pref.prefCode] = pref.prefName;
    return acc;
  }, {} as { [key: number]: string });

  const formattedData = () => {
    const years = new Set<number>();
    Object.values(populationData).forEach((prefData) =>
      prefData.forEach((entry) => years.add(entry.year))
    );

    const sortedYears = Array.from(years).sort();

    return sortedYears.map((year) => {
      const entry: any = { year };
      selectedPrefectures.forEach((prefCode) => {
        const prefEntry = populationData[prefCode]?.find((e) => e.year === year);
        if (prefEntry) {
          entry[`pref_${prefCode}`] = prefEntry[currentType];
        }
      });
      return entry;
    });
  };

  return (
    <div>
      <h1>都道府県別総人口推移グラフ</h1>
      <PrefectureSelector
        prefectures={prefectures}
        selectedPrefectures={selectedPrefectures}
        onChange={handlePrefChange}
      />

      <div>
        <label>
          <input
            type="radio"
            value="total"
            checked={currentType === 'total'}
            onChange={() => setCurrentType('total')}
          />
          総人口
        </label>
        <label>
          <input
            type="radio"
            value="young"
            checked={currentType === 'young'}
            onChange={() => setCurrentType('young')}
          />
          年少人口
        </label>
        <label>
          <input
            type="radio"
            value="working"
            checked={currentType === 'working'}
            onChange={() => setCurrentType('working')}
          />
          生産年齢人口
        </label>
        <label>
          <input
            type="radio"
            value="elderly"
            checked={currentType === 'elderly'}
            onChange={() => setCurrentType('elderly')}
          />
          老年人口
        </label>
      </div>

      {selectedPrefectures.length > 0 && (
        <PopulationChart
          data={formattedData()}
          selectedPrefectures={selectedPrefectures}
          prefNames={prefNames}
        />
      )}
    </div>
  );
};

export default App;
