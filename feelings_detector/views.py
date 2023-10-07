"""views"""
import re

from typing import Dict,List
from collections import Counter

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk
import pandas as pd
import emoji


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializer import AnalyticTextSerializer
from .api import HandleApi


def extract_emojis(text: str) -> str:
    """This function takes a text as input and returns a string 
    that contains only the emojis present in the text.
    >>> text = "Hello! 😃🌍"
    >>> result = extract_emojis(text)
    >>> print(result)
    😃🌍"""
    return ''.join(c for c in text if c in emoji.EMOJI_DATA)


def searchs_hashtags(text: str) -> List[str]:
    """This function takes a text as input and returns"""
    hashtags:[str] = re.findall(r'(#\w+)', text)
    return hashtags


class WordPopulyView(APIView):
    """API view for retrieving the top 5 most used words and their context."""
    permission_classes = [IsAuthenticated]


    def get(self, request):
        """Retrieve the top 5 most used words and their context.

        Returns:
        - Response: A response containing a dictionary with the top 5 most used words 
        and their context.
        """

        data:List[Dict[str,any]] = []
        df = pd.read_csv('DataRedesSociales.csv', usecols=['text'])
        tweets = ' '.join(df['text'])
        tweets = tweets.lower()
        tokens = word_tokenize(tweets, language='spanish')

        # Download stopwords only if they are not already available on your system
        try:
            stopwords.words('spanish')
        except LookupError:
            nltk.download('stopwords')
        finally:
            stop_words = set(stopwords.words('spanish'))

        # Regular expression to filter out special characters
        regex = re.compile('[^a-zA-ZáéíóúñÁÉÍÓÚÑ]')
        filter_words = [word for word in tokens if word not in stop_words \
            and not regex.search(word) and word not in ['http','https']]


        words_frecuency = nltk.FreqDist(filter_words)
        most_words_populy:List[tuple[str,int]] = words_frecuency.most_common(5)

        for word,count in most_words_populy:
            tmp_index:List[int] = df.index[df['text'].str.contains(word, case=False)].tolist()
            data.append({'name':word,
                        'count':count,
                        'top': df.loc[tmp_index, 
                        'text'].tolist()[-10:-5]})

        return Response(data,status=200)


class EmojiPopulyView(APIView):
    """API view for retrieving the top 5 most used empjis"""
    permission_classes = [IsAuthenticated]


    def get(self, request):
        """Retrieve the top 5 most used emojis from the file.

        Returns:
        - Response: A response containing a dictionary with the top 5 most used emojis 
        and their frequencies.
        """
        _df = pd.read_csv('DataRedesSociales.csv', usecols=['text'])
        _df['emojis'] = _df['text'].apply(extract_emojis)
        frecuency_emojis = _df['emojis'].str.split('').explode().value_counts()
        frecuency_emojis.pop('')
        return Response([ {'emoji':emo, 'count':count} for emo, count in frecuency_emojis.items()][:10],200)


class AnalyticTextView(APIView):
    """View set for connecting to an API and sending data for analysis."""
    permission_classes = [IsAuthenticated]


    def post(self, request, *args, **kwargs):
        """Process the request and send data for analysis."""
        serializer = AnalyticTextSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        face_api = HandleApi(serializer.data['option'])
        data = face_api.get_all_data(serializer.data['inputs'])

        return Response(data, status=202)


class  HashtagsView(APIView):
    """API view for retrieving the top 5 most used words and their context."""
    permission_classes = [IsAuthenticated]


    def get(self, request):
        """Retrieve the top 10 most used Hashtags and their context.""" 
        _df = pd.read_csv('DataRedesSociales.csv')
        _df['searchs_hashtags'] = _df['text'].apply(searchs_hashtags)

        # Applies the searchs_hashtags function to each text in the DataFrame
        all_hashtags = [tag for sublist in _df['searchs_hashtags'] for tag in sublist]

        #Count the frequency of each hashtag
        hashtag_counts = Counter(all_hashtags)
        ranking = sorted(hashtag_counts.items(), key=lambda x: x[1], reverse=True)

        data:List[dict] = [{'name': hashtag, 'count': count} for hashtag, count in ranking][:10]
        return Response(data, 202)
