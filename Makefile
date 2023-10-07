

migrate:
	python manage.py makemigrations
	python manage.py migrate

requirements:
	pip install -r requirements.txt

run:
	python manage.py runserver


bootstrap: requirements migrate
	@echo "-------------------------"
	@echo "Your environment is ready"
	@echo "Now run: make run"