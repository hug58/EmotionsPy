import React, { useEffect, useState } from 'react';

interface Emoji {
  emoji: string;
  count: number;
}

function EmojiComponent() {
  const [data, setData] = useState<Emoji[]>([]);

  useEffect(() => { 
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/v1/top/emojis/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {data.map((item, index) => (
          <div className="col-md-3" key={item.emoji}>
            <div className="card mt-2">
              <div className="card-body">
                <h3>{index + 1}. {item.emoji}</h3>
                <p>Total: {item.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmojiComponent;
  