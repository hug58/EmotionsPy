# sys_emotion_sentiment

# Getting started

To get you started on the challenge quickly, we have created some bootstrapping scripts to make things easier.

In plain language all you need to do is create a virtualenv[^1] and run the bootstrap target with make.

A detailed step by step description is:

```
virtualenv venv
source venv/bin/activate
make bootstrap
make run
```

also the project is dockerized


```
docker build -t sys-emotion-sentiment .
docker run -p 8000:8000 sys-emotion-sentiment
```
