

migrate:
	python manage.py makemigrations
	python manage.py migrate

requirements:
	pip install -r requirements.txt

run:
	python manage.py runserver


data:
	python -m nltk.downloader stopwords
	python -m nltk.downloader punkt

bootstrap: requirements migrate data
	@echo "-------------------------"
	@echo "Your environment is ready"
	@echo "Now run: make run"