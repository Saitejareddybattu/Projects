# Dockerfile
FROM apache/airflow:2.1.0

WORKDIR /usr/src/app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["airflow", "webserver"]
