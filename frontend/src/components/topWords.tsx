import  AnalyticsComponent from './analytics/analyticsComponent';


export interface TopWord {
  name: string;
  count: number;
  top: string[];
}

interface TopWordsProps {
  topWords: TopWord[]; // Asegúrate de que sea un arreglo de TopWord
}

export function TopWords(topWords: TopWordsProps){
  return (
  <div className="container-fluid">
    { topWords != null ?
    topWords.topWords.map((item, index) => (
      <div key={index} className="card mt-4">
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
    )): <div> </div>}
  </div>

    );
}

// export default {TopWords,TopWord};
