
export interface Emoji {
  emoji: string;
  count: number;
}

export interface EmojiProps {
  emojis: Emoji[]; // Asegúrate de que sea un arreglo de TopWord
}

export function EmojiComponent(emojis: EmojiProps) {
  return (
    <div className="container">
    { emojis.emojis.length > 0 && (<h1 className="mt-4">Top 10 Emojis</h1>) }
      <div className="row">
        {emojis.emojis.map((item, index) => (
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
