import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Hashtag {
  name: string;
  count: number;
}

const HashtagList: React.FC = () => {
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHashtags = async () => {
      try {
        const response = await axios.get<Hashtag[]>(
          'http://localhost:8000/api/v1/top/hashtags/',
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );
        setHashtags(response.data);
      } catch (error) {
        console.error('Error fetching hashtags:', error);
      }
    };

    fetchHashtags();
  }, []);

  return (
    <div className="container">
      <h1>Top Hashtags</h1>
      <ul className="list-group">
        {hashtags.map((hashtag, index) => (
          <li key={index} className="list-group-item">
            {hashtag.name} - {hashtag.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HashtagList;
