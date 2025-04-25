#!/bin/bash

echo "Starting kxdToys Rails application..."

# Ensure all dependencies are installed
echo "Checking dependencies..."
bundle install

# Run any pending database migrations
echo "Checking database migrations..."
bin/rails db:migrate

# Start the Rails server
echo "Starting Rails server..."
bin/rails server

# If you want to specify port, use:
# bin/rails server -p 3000