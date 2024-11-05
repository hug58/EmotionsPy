# Usa una imagen base de Python
FROM python:3.9

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo requirements.txt al directorio de trabajo
COPY requirements.txt .

# Instala las dependencias del proyecto
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 8000


# Install NLTK data
RUN python -m nltk.downloader punkt
RUN python -m nltk.downloader stopwords


# Define el comando para ejecutar la aplicación
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
