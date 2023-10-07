import React from 'react';
import TopWords from './topWords';
import EmojiComponent from './topEmoji';
import LogoutButton from './login/logout';
import HashtagList from './hashtags';


const Dashboard: React.FC = () => {
  return (
    <div className="container">
      <div className="text-end mt-4">
        <LogoutButton />
      </div>
      <div className="text-center">
        <h1>Welcome to the Dashboard!</h1>
      </div>

      <div>
      <HashtagList/>
      </div>

      <div className="row justify-content-center">
      <h1 className="mt-4">Top 10 Emojis</h1>

        <div className="col-md-6">
          <EmojiComponent />
        </div>
      </div>
      <div className="text-center">
        <h1 className="mt-4">top 5 most used words</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-14">
          <TopWords />
        </div>
    
      </div>

    </div>
  );
};

export default Dashboard;
