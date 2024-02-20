#! bin/bash

flask db migrate
flask seed all
gunicorn --bind 0.0.0.0:8000 app:app
