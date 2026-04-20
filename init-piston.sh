#!/bin/bash

echo "Waiting for Piston to start..."
until $(curl --output /dev/null --silent --head --fail http://localhost:2000/api/v2/runtimes); do
    printf '.'
    sleep 2
done

echo "Piston is up! Checking for Python..."

if ! curl -s http://localhost:2000/api/v2/runtimes | grep -q "python"; then
    echo "Installing Python 3.12..."
    curl -X POST http://localhost:2000/api/v2/packages \
         -H "Content-Type: application/json" \
         -d '{"language": "python", "version": "3.12.0"}'
    echo "Python installation triggered."
else
    echo "Python is already installed."
fi
