import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartComponent from './emotionChar';


interface EmotionResponse {
  value: [
    [
    {
      label: string;
      score: number;
    }
  ]
  ];
  input: string;
}


interface AnalyticsComponentProps {
  input: string[];
  option: string;
}


interface DataItem {
  label: string;
  score: number;
}


function calcularMedia(resultados: EmotionResponse[]): DataItem[] {
  const media: DataItem[] = [];

  resultados.forEach((resultado) => {
    console.log(resultado);
    resultado.value[0].forEach((label) => {
      const existingLabel = media.find((item) => item.label === label.label);
      if (existingLabel) {
        existingLabel.score += label.score;
      } else {
        media.push({ label: label.label, score: label.score });
      }
    });
  });

  const numResultados = resultados.length;

  media.forEach((item) => {
    item.score /= numResultados;
  });

  return media;
}



const AnalyticsComponent: React.FC<AnalyticsComponentProps> = ({ input, option }) => {
  const [emotion, setEmotion] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      const url = import.meta.env.VITE_SERVER_URL + 'api/v1/analysis/'
      try {
        const response = await axios.post<EmotionResponse[]>(
          url,
          {
            inputs: input,
            option: option,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const emotionLabel = response.data;
        setEmotion(calcularMedia(emotionLabel));

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [input]);

  return (
    <div>
      <h3>{option} Analysis</h3>
      <ChartComponent data={emotion} />
    </div>
  );
};

export default AnalyticsComponent;
