FROM --platform=amd64 node:18 as frontend

WORKDIR /react-vite

COPY ./react-vite/package*.json .

RUN npm install

COPY ./react-vite .

RUN npm run build



FROM --platform=amd64 python:3.9

WORKDIR /var/www

# RUN apk add build-base

# RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP=app
ENV FLASK_APP=${FLASK_APP}

ARG FLASK_ENV=production
ENV FLASK_ENV=${FLASK_ENV}

ARG FLASK_RUN_PORT=8000
ENV FLASK_RUN_PORT=${FLASK_RUN_PORT}

ARG DATABASE_URL=
ENV DATABASE_URL=${DATABASE_URL}

ARG SCHEMA=skin_not_rx
ENV SCHEMA=${SCHEMA}

ARG SECRET_KEY=password
ENV SECRET_KEY=${SECRET_KEY}

ARG S3_BUCKET
ENV S3_BUCKET=${S3_BUCKET}

ARG S3_KEY
ENV S3_KEY=${S3_KEY}

ARG S3_SECRET
ENV S3_SECRET=${S3_SECRET}

COPY ./app ./app
COPY ./bin ./bin
COPY ./migrations ./migrations
COPY ./.flaskenv .
COPY ./requirements.txt .

COPY --from=frontend ./react-vite/dist ./react-vite/dist

RUN pip install -r requirements.txt
RUN pip install psycopg2

EXPOSE 8000

CMD ["bash", "./bin/start.sh"]
