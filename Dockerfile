# Usa una imagen base de Python
FROM python:3.9

WORKDIR /app

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

COPY requirements.txt .

# Instala las dependencias del proyecto
RUN pip install -r requirements.txt
RUN pip install psycopg2
RUN pip install gunicorn

COPY . .
EXPOSE 8000


# Install NLTK data
RUN python -m nltk.downloader punkt
RUN python -m nltk.downloader stopwords


CMD ["gunicorn", "backend.wsgi:application", "--config", "gunicorn.py"]

