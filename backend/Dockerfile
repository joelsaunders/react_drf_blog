FROM python:3.6-alpine
ENV PYTHONUNBUFFERED 1
ENV SECRET_KEY 'secret'
RUN apk update && \
    apk add --virtual build-deps gcc musl-dev && \
    apk add postgresql-dev
RUN mkdir /code
WORKDIR /code
ADD ./requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN python manage.py collectstatic --noinput
EXPOSE 8000
CMD ["gunicorn", "main.wsgi:application", "-b 0.0.0.0:8000"]
