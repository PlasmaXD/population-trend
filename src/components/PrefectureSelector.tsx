// src/components/PrefectureSelector.tsx
import React from 'react';

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface Props {
  prefectures: Prefecture[];
  selectedPrefectures: number[];
  onChange: (prefCode: number) => void;
}

const PrefectureSelector: React.FC<Props> = ({ prefectures = [], selectedPrefectures, onChange }) => {
  if (!prefectures || prefectures.length === 0) {
    return <div>都道府県のデータがありません。</div>;
  }

  return (
    <div>
      {prefectures.map((pref) => (
        <label key={pref.prefCode} style={{ display: 'inline-block', margin: '5px' }}>
          <input
            type="checkbox"
            value={pref.prefCode}
            checked={selectedPrefectures.includes(pref.prefCode)}
            onChange={() => onChange(pref.prefCode)}
          />
          {pref.prefName}
        </label>
      ))}
    </div>
  );
};

export default PrefectureSelector;
