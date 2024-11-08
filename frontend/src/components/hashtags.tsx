

export interface Hashtag {
  name: string;
  count: number;
}

interface HashtagProps {
  hashtags: Hashtag[]; // Asegúrate de que sea un arreglo de TopWord
}


export const HashtagList: React.FC<HashtagProps> = (hashtagsProps: HashtagProps) => {
  return (
    <div className="container">
      {hashtagsProps.hashtags.length > 0 && (<h1>Top Hashtags</h1>)}
      <ul className="list-group">
        {hashtagsProps.hashtags.map((hashtag, index) => (
          <li key={index} className="list-group-item">
            {hashtag.name} - {hashtag.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HashtagList;
