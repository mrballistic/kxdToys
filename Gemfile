source 'https://rubygems.org'

ruby '3.2.2'  # Use a modern Ruby version

gem 'rails', '~> 7.1.3'
gem 'activerecord', '7.1.3.4'
gem 'activestorage', '7.1.3.4'
gem 'sqlite3'
gem 'puma'  # Modern web server

# Asset handling
gem 'sprockets-rails'
gem 'importmap-rails'
gem 'turbo-rails'
gem 'stimulus-rails'
gem 'thor'

# API support
gem 'jbuilder'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[ mingw mswin x64_mingw jruby ]

# Update rack to the newest version
gem 'rack'
gem 'rack-session'

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  # Use console on exceptions pages
  gem 'web-console'
  
  # Add speed badges to your Chrome dev tools
  # gem 'rack-mini-profiler'
end

group :test do
  # Use system testing
  gem 'capybara'
  gem 'selenium-webdriver'
end
