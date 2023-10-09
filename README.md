# sys_emotion_sentiment

App that analyzes the feelings and emotions of the 5 most used words. It takes a sample of 5 uses of those words and takes the average.

# Getting started


```
python -m venv venv
source venv/bin/activate
make bootstrap
make run
```

also the backend is dockerized


```
docker build -t sys-emotion-sentiment .
docker run -p 8000:8000 sys-emotion-sentiment
```
