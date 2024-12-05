# Base image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt update && apt-get install -y \
    gcc netcat-traditional libpq-dev gcc python3-dev && \
    apt clean

# Copy requirements and install them
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire openbar directory into the container
COPY ./app /app

# Expose the port Django runs on
EXPOSE 80
