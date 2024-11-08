import {TopWords,TopWord} from './topWords';
import {Emoji, EmojiComponent} from './topEmoji';
import {Hashtag, HashtagList} from './hashtags';

import LogoutButton from './login/logout';
import React, { useState } from 'react';
import axios from 'axios';


const Dashboard: React.FC = () => {

  const username = localStorage.getItem('username')
  const [userEmojis, setUserEmojis] = useState<Emoji[]>([]);
  const [userTopWord, setUserTopWord] = useState<TopWord[]>([]);
  const [userTags, setUserTags] = useState<Hashtag[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const [file, setFile] = useState<File | null>(null);
  const [fieldCsv, setField] = useState('');

  const url:string = import.meta.env.VITE_SERVER_URL + 'api/v1/files/upload/'

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
          setFile(event.target.files[0]);
      }else {
        setField(event.target.value);
      }


  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;


    const formData = new FormData();
    formData.append('file_uploaded', file);
    formData.append('field', fieldCsv);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setUserTopWord(response.data.words)
        setUserEmojis(response.data.emojis)
        setUserTags(response.data.hashtags)

        console.log("Uploaded")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMessage(error.response?.data);
        setTimeout(() => {
            setErrorMessage(null); // Ocultar el mensaje después de 2 segundos
        }, 2000);
    } else {
        console.error('Error sending file:', error);
    }
    }
};

return (
    <div className="container">
      <div className="text-end mt-4">
        <LogoutButton />
      </div>
      <div className="text-center">
        <h1>Welcome {username}! </h1>
        <h4>Analyzes Feelings and Emotions a list of Tweets</h4>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column' }}>
          {errorMessage && (
                <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} style={{ textAlign: 'center', width: '300px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input onChange={handleFileChange} type="text" 
                    placeholder='Field CSV' name="name" style={{ display: 'block', width: '100%' }} />
                </div>
                <button type="submit">Send File CSV</button>
            </form>
        </div>
      <div>
      <HashtagList hashtags={userTags}/>
      </div>
      <div className="row justify-content-center">
      <div className="col-md-6">
        <EmojiComponent emojis={userEmojis}/>
      </div>
      </div>
      { userTopWord.length > 0 && (<div className="text-center">
        <h1 className="mt-4">top 5 most used words</h1>
      </div>)}
      <div className="row justify-content-center">
        <div className="col-md-14">
          <TopWords topWords={userTopWord} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
