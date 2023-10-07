import React, { useEffect, useState } from 'react';
import  AnalyticsComponent from './analytics/analyticsComponent';
interface TopWord {
  name: string;
  count: number;
  top: string[];
}




function TopWords() {
  const [data, setData] = useState<TopWord[]>([]);


  useEffect(() => { 
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/v1/top/words/', {
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
<div className="container-fluid">
  {data.map((item) => (
    <div className="card mt-4">
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <h3>{item.name}</h3>
            <p>Total: {item.count}</p>
            <ul>
              {item.top.map((text, index) => (
                <li key={index}>{text}</li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <div>
              <AnalyticsComponent input={item.top} option={'sentiment'} />
              <AnalyticsComponent input={item.top} option={'emotion'} />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


  );
}

export default TopWords;
